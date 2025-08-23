import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { feeds } from '@/lib/db/schema';

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({
      name,
      url,
      userId,
    })
    .returning();

  return result;
}

export async function getFeedById(id: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.id, id));
  return result;
}

export async function getFeedByUrl(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

export async function getAllFeeds() {
  const result = await db.select().from(feeds);
  return result;
}
