import { type CommandHandler } from './types';
import { deleteAllUsers } from '@/lib/db/queries/users';

export const handleReset: CommandHandler = async function () {
  await deleteAllUsers();
};
