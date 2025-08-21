import { db } from '@/lib/db';
import { feedFollows } from '@/lib/db/schema';

export async function createFeedFollow(userId: string, feedId: string) {
  const result = await db.insert(feedFollows).values({
    userId,
    feedId,
  });

  return result;
}
