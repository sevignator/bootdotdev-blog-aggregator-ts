import { deleteFeedFollow } from '@/lib/db/queries/feedFollows';
import { UserCommandHandler } from './types';
import { checkArgValidity } from '@/utils/registry';

export const handleUnfollow: UserCommandHandler = async function (
  cmdName,
  user,
  ...args
) {
  const [feedUrl] = args;
  checkArgValidity(feedUrl !== undefined, 'feedUrl');

  await deleteFeedFollow(user.name, feedUrl);

  console.log(`${user.name} has stopped following the feed at "${feedUrl}".`);
};
