import { type CommandHandler } from '.';
import { checkArgValidity } from '@/utils/registry';
import { getUserByName } from '@/lib/db/queries/users';
import { setUser } from '@/config';

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
