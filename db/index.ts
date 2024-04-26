// import { drizzle } from "drizzle-orm/mysql2";
// import * as schema from "./schema";
// import { Logger } from "drizzle-orm/logger";
// import mysql from "mysql2";

// const dev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

// const connection = await mysql.createConnection(
//   dev ? process.env.DEV_DATABASE_URL : process.env.DATABASE_URL
// );

// class MyLogger implements Logger {
//   logQuery(query: string, params: unknown[]): void {
//     console.log({ query, params });
//   }
// }

// export const db = drizzle(connection, {
//   schema,
//   mode: "planetscale",
//   logger: dev ? new MyLogger() : false,
// });
// export type DbClient = typeof db;
