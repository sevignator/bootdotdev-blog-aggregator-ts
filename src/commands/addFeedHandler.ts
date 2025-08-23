import { CommandHandler } from '.';
import { checkArgValidity } from '@/utils/registry';
import { readConfig } from '@/config';
import { getUserByName } from '@/lib/db/queries/users';
import { createFeed } from '@/lib/db/queries/feeds';
import { createFeedFollow } from '@/lib/db/queries/feedfollows';

export const addFeedHandler: CommandHandler = async function (
  cmdName,
  ...args
) {
  const [name, url] = args;
  checkArgValidity(name !== undefined, 'name');
  checkArgValidity(url !== undefined, 'url');

  const { currentUserName } = readConfig();
  const user = await getUserByName(currentUserName);
  const feed = await createFeed(name, url, user.id);
  await createFeedFollow(user.id, feed.id);

  console.log(
    `The user "${currentUserName}" is now following the feed "${feed.name}"`
  );
};
