import { deleteAllUsers, getAllUsers } from '@/lib/db/queries/users';
import { CommandHandler } from '.';
import { readConfig } from '@/config';

export const resetHandler: CommandHandler = async function () {
  await deleteAllUsers();
};
