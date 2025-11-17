import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) {
  try {
    // Insert lead into database
    const { data: result, error } = await supabase
      .from("leads")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message || null,
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("Error submitting form:", error);
      return { success: false, error: error.message };
    }

    // Send email notification to admin
    try {
      const emailResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            to: "info@renewray.in",
            subject: `New Contact Form Submission - ${data.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Message:</strong> ${data.message || "No message"}</p>
              <hr>
              <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
            `,
          }),
        }
      );

      if (!emailResponse.ok) {
        console.warn(
          "Email notification failed, but form was saved to database"
        );
      }
    } catch (emailErr) {
      console.warn("Could not send email notification:", emailErr);
      // Don't fail the form submission if email fails
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
