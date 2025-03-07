import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const treatmentStaffTable = mysqlTable(
  "treatment_staff",
  {
    treatmentId: varchar("treatment_id", { length: 255 })
      .notNull()
      .references(() => treatmentTable.id, { onDelete: "cascade" }),
    staffId: varchar("staff_id", { length: 255 })
      .notNull()
      .references(() => staffTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.treatmentId, table.staffId] }),
    };
  }
);

// Treatment Table
export const treatmentTable = mysqlTable("treatment", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  duration: varchar("duration", { length: 255 }).notNull(),
  price: varchar("price", { length: 255 }).notNull(),
});

export const treatmentRelations = relations(treatmentTable, ({ many }) => ({
  staff: many(staffTable),
  appointments: many(appointmentTable),
}));

// Staff Table
export const staffTable = mysqlTable("staff", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const staffRelations = relations(staffTable, ({ many }) => ({
  treatments: many(treatmentTable),
  appointments: many(appointmentTable),
}));

// Appointment Table
export const appointmentTable = mysqlTable("appointment", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  treatmentId: varchar("treatment_id", { length: 255 })
    .notNull()
    .references(() => treatmentTable.id, { onDelete: "cascade" }),
  staffId: varchar("staff_id", { length: 255 })
    .notNull()
    .references(() => staffTable.id, { onDelete: "cascade" }),
  date: varchar("date", { length: 255 }).notNull(),
  start: varchar("start", { length: 255 }).notNull(),
  groupId: varchar("group_id", { length: 255 }).notNull(),
});

export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  user: one(userTable, {
    fields: [appointmentTable.userId],
    references: [userTable.id],
  }),
  treatment: one(treatmentTable, {
    fields: [appointmentTable.treatmentId],
    references: [treatmentTable.id],
  }),
  staff: one(staffTable, {
    fields: [appointmentTable.staffId],
    references: [staffTable.id],
  }),
}));

export const userTable = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const accountTable = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessionTable = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
