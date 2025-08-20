import {
  createUser,
  getUser,
  deleteAllUsers,
  getAllUsers,
} from '@/lib/db/queries/users';
import { setUser, readConfig } from '@/config';

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export const registerHandler: CommandHandler = async function (
  cmdName,
  ...args
) {
  if (args.length === 0) {
    console.log('Please provide a username.');
    process.exit(1);
  }

  const [username] = args;
  const userData = await getUser(username);

  if (userData) {
    throw new Error(
      `A user named "${username}" already exists within the database.`
    );
  }

  await createUser(username);
  await setUser(username);
  console.log(`A new user named "${username}" has been created.`);
};

export const loginHandler: CommandHandler = async function (cmdName, ...args) {
  if (args.length === 0) {
    console.log('Please provide a username.');
    process.exit(1);
  }

  const [username] = args;
  const userData = await getUser(username);

  if (!userData) {
    throw new Error(`There's no "${username}" username in the database.`);
  }

  await setUser(username);
  console.log(`You are now logged in as "${username}".`);
};

export const resetHandler: CommandHandler = async function (cmdName, ...args) {
  await deleteAllUsers();
};

export const usersHandler: CommandHandler = async function () {
  const users = await getAllUsers();
  const loggedInUser = readConfig().currentUserName;

  for (const user of users) {
    console.log(
      `* ${user.name}`,
      loggedInUser === user.name ? '(current)' : ''
    );
  }
};
