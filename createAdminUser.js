import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import crypto from "crypto";

// Read .env.local manually
const envContent = fs.readFileSync(".env.local", "utf-8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

console.log("Creating Admin User...\n");

// You need to use the service role key for admin operations
// For now, we'll use a simpler approach via the admin API

async function createAdminUser() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Step 1: Create auth user
    console.log("Step 1: Creating authentication user...");
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: "admin@renewray.in",
        password: "renewray123",
        email_confirm: true,
      });

    if (authError) {
      console.error("❌ Error creating auth user:", authError.message);
      return;
    }

    console.log("✅ Auth user created:", authData.user?.id);

    // Step 2: Create admin_users record
    console.log("\nStep 2: Creating admin user record...");
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .insert([
        {
          id: authData.user?.id,
          email: "admin@renewray.in",
          name: "RenewRay Admin",
          password_hash: "hashed_password_here", // Supabase handles this
          is_active: true,
        },
      ])
      .select();

    if (adminError) {
      console.error("❌ Error creating admin record:", adminError.message);
      return;
    }

    console.log("✅ Admin user record created:", adminData);
    console.log("\n✅ ADMIN USER CREATED SUCCESSFULLY!");
    console.log("\n📝 Login Credentials:");
    console.log("   Email: admin@renewray.in");
    console.log("   Password: renewray123");
    console.log("\n🔗 Admin Login URL: http://localhost:5173/admin/login");
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
  }
}

createAdminUser();
