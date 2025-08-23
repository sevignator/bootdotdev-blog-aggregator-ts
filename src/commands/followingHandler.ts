import { type UserCommandHandler } from '.';
import { getFeedFollowsByUser } from '@/lib/db/queries/feedfollows';
import { getFeedById } from '@/lib/db/queries/feeds';

export const followingHandler: UserCommandHandler = async function (
  cmd,
  user,
  ...args
) {
  const feedFollows = await getFeedFollowsByUser(user.id);

  console.log(`The feeds followed by ${user.name} are:`);
  console.log('');

  for (const feedFollow of feedFollows) {
    const feed = await getFeedById(feedFollow.feedId);
    console.log(`- '${feed.name}'`);
  }

  console.log('');
};
