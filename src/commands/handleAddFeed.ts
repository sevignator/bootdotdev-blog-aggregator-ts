import { type UserCommandHandler } from './types';
import { checkArgValidity } from '@/utils/registry';
import { createFeed } from '@/lib/db/queries/feeds';
import { createFeedFollow } from '@/lib/db/queries/feedFollows';

export const handleAddFeed: UserCommandHandler = async function (
  cmdName,
  user,
  ...args
) {
  const [name, url] = args;
  checkArgValidity(name !== undefined, 'name');
  checkArgValidity(url !== undefined, 'url');

  const feed = await createFeed(name, url, user.id);
  await createFeedFollow(user.id, feed.id);

  console.log(`${user.name} is now following the feed "${feed.name}"`);
};
