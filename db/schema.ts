import { relations } from "drizzle-orm";
import { varchar, mysqlTable, datetime } from "drizzle-orm/mysql-core";
import { primaryKey } from "drizzle-orm/mysql-core";

// User Table
export const userTable = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
});

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

export const sessionTable = mysqlTable("session", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: datetime("expires_at").notNull(),
});
