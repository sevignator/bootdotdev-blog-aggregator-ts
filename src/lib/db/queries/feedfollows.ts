import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { feedFollows } from '@/lib/db/schema';
import { getUserById } from '@/lib/db/queries/users';
import { getFeedById } from '@/lib/db/queries/feeds';

export async function createFeedFollow(userId: string, feedId: string) {
  const result = await db.insert(feedFollows).values({
    userId,
    feedId,
  });
  const user = await getUserById(userId);
  const feed = await getFeedById(feedId);

  return {
    result,
    user: user.name,
    feed: feed.name,
  };
}

export async function getFeedFollowsByUser(userId: string) {
  const result = await db
    .select()
    .from(feedFollows)
    .where(eq(feedFollows.userId, userId));

  return result;
}
