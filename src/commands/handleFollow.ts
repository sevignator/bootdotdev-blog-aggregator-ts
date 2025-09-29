import { type UserCommandHandler } from './types';
import { checkArgValidity } from '@/utils/registry';
import { createFeedFollow } from '@/lib/db/queries/feedFollows';
import { getFeedByUrl } from '@/lib/db/queries/feeds';

export const handleFollow: UserCommandHandler = async function (
  cmd,
  user,
  ...args
) {
  const [feedURL] = args;
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const feed = await getFeedByUrl(feedURL);

  await createFeedFollow(user.id, feed.id);

  console.log(`${user.name} is now following the feed "${feed.name}"`);
};
