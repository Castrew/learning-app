import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { userTable } from "./schema";

const poolConnection = mysql.createPool(process.env.DATABASE_URL as string);

export const db = drizzle(poolConnection, {
  schema: { userTable },
  mode: "default",
});
