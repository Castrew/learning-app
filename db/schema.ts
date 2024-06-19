import { relations } from "drizzle-orm";
import {
  bigint,
  double,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";

// User Table
export const userTable = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
});

// User Relations
export const usersRelations = relations(userTable, ({ many }) => ({
  appointments: many(appointmentTable),
}));

// Treatment Table
export const treatmentTable = mysqlTable("treatment", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  title: varchar("title", { length: 255 }),
  duration: varchar("duration", { length: 255 }),
  price: varchar("price", { length: 255 }),
});

// Treatment Relations
export const treatmentRelations = relations(treatmentTable, ({ many }) => ({
  appointments: many(appointmentTable),
}));

// Appointment Table
export const appointmentTable = mysqlTable("appointment", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  start: timestamp("start", { mode: "string" }),
  end: timestamp("end", { mode: "string" }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  treatmentId: varchar("treatment_id", { length: 255 })
    .notNull()
    .references(() => treatmentTable.id),
});

// Appointment Relations
export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  user: one(userTable, {
    fields: [appointmentTable.userId],
    references: [userTable.id],
  }),
  treatment: one(treatmentTable, {
    fields: [appointmentTable.treatmentId],
    references: [treatmentTable.id],
  }),
}));

// Session Table
export const sessionTable = mysqlTable("session", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});
