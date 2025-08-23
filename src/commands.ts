import { setUser, readConfig } from '@/config';
import { fetchFeed } from '@/utils/rss';
import { checkArgValidity } from '@/utils/registry';
import {
  createUser,
  getUserByName,
  deleteAllUsers,
  getAllUsers,
  getUserById,
} from '@/lib/db/queries/users';
import {
  createFeed,
  getAllFeeds,
  getFeedById,
  getFeedByUrl,
} from '@/lib/db/queries/feeds';
import {
  createFeedFollow,
  getFeedFollowsByUser,
} from './lib/db/queries/feedfollows';

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export const registerHandler: CommandHandler = async function (
  cmdName,
  ...args
) {
  const [userName] = args;
  checkArgValidity(userName !== undefined, 'username');

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
  const [userName] = args;
  checkArgValidity(userName !== undefined, 'username');

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
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const feed = await fetchFeed(feedURL);
  console.log(feed);
};

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
