import { type CommandHandler } from '.';
import { getAllUsers } from '@/lib/db/queries/users';
import { readConfig } from '@/config';

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
