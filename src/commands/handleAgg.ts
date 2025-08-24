import { type CommandHandler } from './types';
import { checkArgValidity } from '@/utils/registry';
import { fetchFeed } from '@/utils/rss';

export const handleAgg: CommandHandler = async function (cmdName, ...args) {
  const [feedURL] = args;
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const feed = await fetchFeed(feedURL);
  console.log(feed);
};
