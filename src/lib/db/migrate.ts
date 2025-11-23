import {
    type NeonQueryFunction,
    neon,
    neonConfig,
  } from "@neondatabase/serverless";
  import { drizzle } from "drizzle-orm/neon-http";
  import { migrate } from "drizzle-orm/neon-http/migrator";
  import { config } from "dotenv";

config({ path: ".env.local" });

  const runMigrate = async () => {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }
    neonConfig.fetchConnectionCache = true;
  
    const sql: NeonQueryFunction<boolean, boolean> = neon(DATABASE_URL);
    const db = drizzle(sql);
    
    await migrate(db, { migrationsFolder: "src/lib/db/migrations" });
  
    process.exit(0);
  };
  
  runMigrate().catch((err) => {
    console.error("❌ Migration failed");
    console.error(err);
    process.exit(1);
  });
  