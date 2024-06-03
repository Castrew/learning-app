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
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  appointment: many(appointment),
}));

export const treatment = mysqlTable("treatment", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  duration: varchar("duration", { length: 255 }),
  price: varchar("price", { length: 255 }),
});

export const treatmentRelations = relations(treatment, ({ many }) => ({
  appointment: many(appointment),
}));

export const appointment = mysqlTable("appointment", {
  id: serial("id").primaryKey(),
  start: timestamp("start", { mode: "string" }),
  end: timestamp("end", { mode: "string" }),
  user_id: bigint("user_id", { mode: "bigint", unsigned: true })
    .notNull()
    .references(() => user.id),
  treatment_id: bigint("treatment_id", { mode: "bigint", unsigned: true })
    .notNull()
    .references(() => treatment.id),
});

export const appointmentRelations = relations(appointment, ({ one, many }) => ({
  user: one(user, {
    fields: [appointment.user_id],
    references: [user.id],
  }),
  treatment: many(treatment),
}));
