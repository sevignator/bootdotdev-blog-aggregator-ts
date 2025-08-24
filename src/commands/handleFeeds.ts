import { type CommandHandler } from './types';
import { getAllFeeds } from '@/lib/db/queries/feeds';
import { getUserById } from '@/lib/db/queries/users';

export const handleFeeds: CommandHandler = async function (cmdName, ...args) {
  const feeds = await getAllFeeds();
  const output = [];

  for (const feed of feeds) {
    const user = await getUserById(feed.userId);
    const data = [];

    data.push(`Name: ${feed.name}`);
    data.push(`URL: ${feed.url}`);
    data.push(`User: ${user.name}`);

    output.push(data.join('\n'));
  }

  console.log(output.join('\n---\n'));
};
