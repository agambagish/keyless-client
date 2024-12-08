import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 42 })
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  uid: text("uid").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
