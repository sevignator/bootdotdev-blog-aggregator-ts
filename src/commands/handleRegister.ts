import { type CommandHandler } from './types';
import { createUser, getUserByName } from '@/lib/db/queries/users';
import { checkArgValidity } from '@/utils/registry';
import { setUser } from '@/config';

export const handleRegister: CommandHandler = async function (
  cmdName,
  ...args
) {
  const [userName] = args;
  checkArgValidity(userName !== undefined, 'username');

  const userData = await getUserByName(userName);

  if (userData) {
    throw new Error(`A user named "${userName}" already exists.`);
  }

  await createUser(userName);
  await setUser(userName);
  console.log(`A new user named "${userName}" has been created.`);
};
