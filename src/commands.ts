import {
  createUser,
  getUserByName,
  deleteAllUsers,
  getAllUsers,
  getUserFromId,
} from '@/lib/db/queries/users';
import { setUser, readConfig } from '@/config';
import { fetchFeed } from '@/utils/rss';
import { createFeed, getFeeds } from '@/lib/db/queries/feeds';

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export const registerHandler: CommandHandler = async function (
  cmdName,
  ...args
) {
  if (args.length === 0) {
    console.log('Please provide a user name.');
    process.exit(1);
  }

  const [userName] = args;
  const userData = await getUserByName(userName);

  if (userData) {
    throw new Error(
      `A user named "${userName}" already exists within the database.`
    );
  }

  await createUser(userName);
  await setUser(userName);
  console.log(`A new user named "${userName}" has been created.`);
};

export const loginHandler: CommandHandler = async function (cmdName, ...args) {
  if (args.length === 0) {
    console.log('Please provide a user name.');
    process.exit(1);
  }

  const [userName] = args;
  const userData = await getUserByName(userName);

  if (!userData) {
    throw new Error(`There's no "${userName}" user name in the database.`);
  }

  await setUser(userName);
  console.log(`You are now logged in as "${userName}".`);
};

export const resetHandler: CommandHandler = async function () {
  await deleteAllUsers();
};

export const usersHandler: CommandHandler = async function () {
  const users = await getAllUsers();
  const { currentUserName } = readConfig();

  for (const user of users) {
    console.log(
      `* ${user.name}`,
      currentUserName === user.name ? '(current)' : ''
    );
  }
};

export const aggHandler: CommandHandler = async function (cmdName, ...args) {
  const [feedURL] = args;
  // const feed = await fetchFeed(feedURL);
  const feed = await fetchFeed('https://www.wagslane.dev/index.xml');
  console.log(feed);
};

export const addFeedHandler: CommandHandler = async function (
  cmdName,
  ...args
) {
  const [name, url] = args;
  const { currentUserName } = readConfig();
  const user = await getUserByName(currentUserName);

  await createFeed(name, url, user.id);
};

export const feedsHandler: CommandHandler = async function (cmdName, ...args) {
  const feeds = await getFeeds();

  for (const feed of feeds) {
    const user = await getUserFromId(feed.userId);

    console.log('Name:', feed.name);
    console.log('URL:', feed.url);
    console.log('User:', user.name);
    console.log('---');
  }
};
