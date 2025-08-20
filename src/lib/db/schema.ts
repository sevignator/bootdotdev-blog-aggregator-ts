import {
  pgTable,
  timestamp,
  uuid,
  text,
  foreignKey,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull().unique(),
});

export const feeds = pgTable(
  'feeds',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    name: text('name').notNull(),
    url: text('url').notNull().unique(),
    userId: uuid('user_id').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'user_id_fk',
      columns: [table.userId],
      foreignColumns: [users.id],
    }).onDelete('cascade'),
  ]
);
