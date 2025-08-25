import {
  pgTable,
  timestamp,
  uuid,
  text,
  foreignKey,
  unique,
} from 'drizzle-orm/pg-core';

export type User = typeof users.$inferSelect;
export type Feed = typeof feeds.$inferSelect;
export type FeedFollow = typeof feedFollows.$inferInsert;

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
    lastFetchedAt: timestamp('last_fetched_at'),
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

export const feedFollows = pgTable(
  'feed_follows',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    userId: uuid('user_id').notNull(),
    feedId: uuid('feed_id').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'user_id_fk',
      columns: [table.userId],
      foreignColumns: [users.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'feed_id_fk',
      columns: [table.feedId],
      foreignColumns: [feeds.id],
    }).onDelete('cascade'),
    unique('user_feed_unique').on(table.userId, table.feedId),
  ]
);
