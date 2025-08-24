import { type UserCommandHandler } from './types';
import { getFeedFollowsByUser } from '@/lib/db/queries/feedFollows';
import { getFeedById } from '@/lib/db/queries/feeds';

export const handleFollowing: UserCommandHandler = async function (
  cmd,
  user,
  ...args
) {
  const feedFollows = await getFeedFollowsByUser(user.id);

  if (feedFollows.length === 0) {
    console.log(`${user.name} is not currently following any feed.`);
    return;
  }

  console.log(`The feeds followed by ${user.name} are:`);

  for (const feedFollow of feedFollows) {
    const feed = await getFeedById(feedFollow.feedId);
    console.log(`- '${feed.name}'`);
  }
};
