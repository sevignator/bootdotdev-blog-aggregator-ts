import { desc, inArray } from 'drizzle-orm';

import { db } from '@/lib/db';
import { type Post, posts } from '@/lib/db/schema';
import { getFeedFollowsByUser } from '@/lib/db/queries/feedFollows';

export async function createPost({
  title,
  url,
  publishedAt,
  feedId,
  description,
}: Post) {
  const [result] = await db
    .insert(posts)
    .values({
      title,
      url,
      publishedAt,
      feedId,
      description,
    })
    .returning();

  return result;
}

export async function getPostsForUser(userId: string, limit: number = 2) {
  const feedFollows = await getFeedFollowsByUser(userId);

  const result = await db
    .select()
    .from(posts)
    .where(
      inArray(
        posts.feedId,
        feedFollows.map((feedFollow) => feedFollow.feedId)
      )
    )
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
  return result;
}
