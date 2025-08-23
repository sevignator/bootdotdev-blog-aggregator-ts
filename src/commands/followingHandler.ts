import { CommandHandler } from '.';
import { readConfig } from '@/config';
import { getUserByName } from '@/lib/db/queries/users';
import { getFeedFollowsByUser } from '@/lib/db/queries/feedfollows';
import { getFeedById } from '@/lib/db/queries/feeds';

export const followingHandler: CommandHandler = async function (cmd, ...args) {
  const { currentUserName } = readConfig();
  const user = await getUserByName(currentUserName);

  const feedFollows = await getFeedFollowsByUser(user.id);

  console.log(`The feeds followed by ${currentUserName} are:`);
  console.log('');

  for (const feedFollow of feedFollows) {
    const feed = await getFeedById(feedFollow.feedId);
    console.log(`- '${feed.name}'`);
  }

  console.log('');
};
