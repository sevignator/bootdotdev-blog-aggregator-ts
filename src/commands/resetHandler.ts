import { type CommandHandler } from '.';
import { deleteAllUsers } from '@/lib/db/queries/users';

export const resetHandler: CommandHandler = async function () {
  await deleteAllUsers();
};
