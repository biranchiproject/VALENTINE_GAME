import { defineConfig } from "drizzle-kit";


const isPostgres = !!process.env.DATABASE_URL;

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: isPostgres ? "postgresql" : "sqlite",
  dbCredentials: isPostgres
    ? { url: process.env.DATABASE_URL! }
    : { url: "rooms.db" },
});
