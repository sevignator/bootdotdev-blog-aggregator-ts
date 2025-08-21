import { db } from '@/lib/db';
import { feeds } from '@/lib/db/schema';

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db.insert(feeds).values({
    name,
    url,
    userId,
  });

  return result;
}
