import { createClient } from "@supabase/supabase-js";
import fs from "fs";

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

console.log("Testing Supabase Connection...\n");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR: Missing environment variables");
  console.error("VITE_SUPABASE_URL:", supabaseUrl ? "✓ Found" : "✗ Missing");
  console.error(
    "VITE_SUPABASE_ANON_KEY:",
    supabaseAnonKey ? "✓ Found" : "✗ Missing"
  );
  process.exit(1);
}

console.log("✓ Environment variables loaded");
console.log("URL:", supabaseUrl);
console.log("Key:", supabaseAnonKey.substring(0, 20) + "...\n");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log("Attempting to connect to Supabase...");

    // Test 1: Check if we can query the leads table
    const { data, error } = await supabase.from("leads").select("*").limit(1);

    if (error) {
      console.error("❌ Error querying leads table:", error.message);
      return;
    }

    console.log("✅ Successfully connected to Supabase!");
    console.log('✅ "leads" table exists and is accessible');
    console.log("Records found:", data.length);

    if (data.length > 0) {
      console.log("\nSample record:");
      console.log(JSON.stringify(data[0], null, 2));
    }

    // Test 2: Try inserting a test record
    console.log("\n\nAttempting to insert a test record...");
    const testRecord = {
      name: "Test User " + new Date().getTime(),
      email: "test@example.com",
      phone: "+1234567890",
      message: "Supabase connection test",
      status: "test",
    };

    const { data: insertData, error: insertError } = await supabase
      .from("leads")
      .insert([testRecord])
      .select();

    if (insertError) {
      console.error("❌ Error inserting test record:", insertError.message);
      return;
    }

    console.log("✅ Successfully inserted test record!");
    console.log("Test record ID:", insertData[0].id);
    console.log("\n✅ SUPABASE CONNECTION IS WORKING CORRECTLY!");
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
  }
}

testConnection();
