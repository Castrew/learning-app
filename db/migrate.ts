import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2";

const migrationClient = mysql.createConnection(
  process.env.DATABASE_URL as string
);

const main = async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./db/migrations",
  });

  await migrationClient.end();
};

main();
