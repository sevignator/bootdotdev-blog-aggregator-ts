import { type CommandHandler } from '.';
import { checkArgValidity } from '@/utils/registry';
import { fetchFeed } from '@/utils/rss';

export const aggHandler: CommandHandler = async function (cmdName, ...args) {
  const [feedURL] = args;
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const feed = await fetchFeed(feedURL);
  console.log(feed);
};
