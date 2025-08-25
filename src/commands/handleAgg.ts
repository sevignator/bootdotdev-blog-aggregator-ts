import { type CommandHandler } from './types';
import { checkArgValidity } from '@/utils/registry';
import { scrapeFeeds } from '@/utils/rss';
import { parseDuration } from '@/utils/time';

export const handleAgg: CommandHandler = async function (cmdName, ...args) {
  const [timeBetweenReqs] = args;
  checkArgValidity(timeBetweenReqs !== undefined, 'timeBetweenReqs');

  const duration = parseDuration(timeBetweenReqs);

  console.log(`Collecting feeds every ${timeBetweenReqs}.\n`);

  // Initial scrape that occurs immediately.
  await scrapeFeeds();

  // Subsequent scrapes that occur periodically.
  const interval = setInterval(async () => {
    await scrapeFeeds();
  }, duration);

  await new Promise<void>((resolve) => {
    process.on('SIGINT', () => {
      console.log('Shutting down feed aggregator...');
      clearInterval(interval);
      resolve();
    });
  });
};
