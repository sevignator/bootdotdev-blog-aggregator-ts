import { type CommandHandler } from '.';
import { checkArgValidity } from '@/utils/registry';
import { readConfig } from '@/config';
import { getUserByName } from '@/lib/db/queries/users';
import { createFeedFollow } from '@/lib/db/queries/feedfollows';
import { getFeedByUrl } from '@/lib/db/queries/feeds';

export const followHandler: CommandHandler = async function (cmd, ...args) {
  const [feedURL] = args;
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const { currentUserName } = readConfig();
  const feed = await getFeedByUrl(feedURL);
  const user = await getUserByName(currentUserName);

  await createFeedFollow(user.id, feed.id);

  console.log(
    `The user "${currentUserName}" is now following the feed "${feed.name}"`
  );
};
