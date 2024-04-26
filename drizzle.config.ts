import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

const dev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
  // This driver is needed for the Next.js 14 implementation
  driver: "mysql2",
  verbose: true,
  // breakpoints: dev && true,
});
