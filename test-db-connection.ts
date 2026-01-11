import { neon } from "@neondatabase/serverless";

// Trying the NON-POOLED connection string (removed '-pooler' from the host I saw earlier)
// Original seen: ep-jolly-cherry-ahwgk4me-pooler
// Modified: ep-jolly-cherry-ahwgk4me
const connectionString =
  "postgresql://neondb_owner:npg_y2XbGrVE5nuP@ep-jolly-cherry-ahwgk4me.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(connectionString);

async function testConnection() {
  console.log(
    "Testing connection to:",
    connectionString.replace(/:[^:@]+@/, ":***@")
  ); // Mask password
  try {
    const result = await sql`SELECT version()`;
    console.log("✅ Connection Successful!");
    console.log("Version:", result[0].version);
  } catch (error) {
    console.error("❌ Connection Failed:", error);
  }
}

testConnection();
