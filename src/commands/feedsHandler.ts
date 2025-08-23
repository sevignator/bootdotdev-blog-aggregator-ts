import { type CommandHandler } from '.';
import { getAllFeeds } from '@/lib/db/queries/feeds';
import { getUserById } from '@/lib/db/queries/users';

export const feedsHandler: CommandHandler = async function (cmdName, ...args) {
  const feeds = await getAllFeeds();

  for (const feed of feeds) {
    const user = await getUserById(feed.userId);

    console.log('Name:', feed.name);
    console.log('URL:', feed.url);
    console.log('User:', user.name);
    console.log('---');
  }
};
