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

console.log("Testing Admin and Projects Tables...\n");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTables() {
  try {
    console.log("1. Checking admin_users table...");
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .limit(1);

    if (adminError) {
      console.error(
        "❌ Error accessing admin_users table:",
        adminError.message
      );
    } else {
      console.log("✅ admin_users table exists and is accessible");
      console.log("   Records found:", adminData.length);
    }

    console.log("\n2. Checking projects table...");
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .limit(1);

    if (projectError) {
      console.error("❌ Error accessing projects table:", projectError.message);
    } else {
      console.log("✅ projects table exists and is accessible");
      console.log("   Records found:", projectData.length);
    }

    if (!adminError && !projectError) {
      console.log("\n✅ ALL TABLES ARE CREATED AND ACCESSIBLE!");
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
  }
}

testTables();
