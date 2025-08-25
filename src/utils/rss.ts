import { XMLParser } from 'fast-xml-parser';

import { type User, type Feed } from '@/lib/db/schema';
import {
  getNextFeedToFetch,
  updateFeedFetchDate,
} from '@/lib/db/queries/feeds';

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const parser = new XMLParser();
  const res = await fetch(feedURL, {
    headers: {
      'User-Agent': 'gator ',
    },
  });
  const body = await res.text();
  const feed: RSSFeed = parser.parse(body).rss;
  const channel = feed?.channel;

  if (!channel) {
    throw new Error(`There's no channel found at the address "${feedURL}".`);
  }

  const { title, link, description } = channel;
  const item = [];

  if (channel.item && Array.isArray(channel.item)) {
    for (const currentItem of channel.item) {
      const { title, link, description, pubDate } = currentItem;

      // Skip the current item if there's a missing field.
      if (!title || !link || !description || !pubDate) {
        continue;
      }

      item.push({
        title,
        link,
        description,
        pubDate,
      });
    }
  }

  return {
    title,
    link,
    description,
    item,
  };
}

export async function printFeed(feed: Feed, user: User) {
  console.log(feed);
  console.log(user);
}

export async function markFetchedFeed(feedId: string) {
  await updateFeedFetchDate(feedId);
}

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  const feedData = await fetchFeed(nextFeed.url);

  await updateFeedFetchDate(nextFeed.id);

  console.log(`Posts from ${nextFeed.name}:\n`);

  for (const item of feedData.item) {
    console.log(`- ${item.title}`);
  }

  console.log('');
}
