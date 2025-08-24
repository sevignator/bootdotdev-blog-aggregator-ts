import { eq, and } from 'drizzle-orm';

import { db } from '@/lib/db';
import { FeedFollow, feedFollows } from '@/lib/db/schema';
import { getUserById, getUserByName } from '@/lib/db/queries/users';
import { getFeedById, getFeedByUrl } from '@/lib/db/queries/feeds';

export async function createFeedFollow(userId: string, feedId: string) {
  const [result] = await db.insert(feedFollows).values({
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

export async function getFeedFollowsByUser(
  userId: string
): Promise<FeedFollow[]> {
  const result = await db
    .select()
    .from(feedFollows)
    .where(eq(feedFollows.userId, userId));

  return result;
}

export async function deleteFeedFollow(
  userName: string,
  feedUrl: string
): Promise<FeedFollow> {
  const feed = await getFeedByUrl(feedUrl);
  const user = await getUserByName(userName);

  const [result] = await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.feedId, feed.id), eq(feedFollows.userId, user.id))
    )
    .returning();

  return result;
}
