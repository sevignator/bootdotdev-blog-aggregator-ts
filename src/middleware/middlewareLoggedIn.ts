import { type CommandHandler, type UserCommandHandler } from '@/commands/types';
import { readConfig } from '@/config';
import { getUserByName } from '@/lib/db/queries/users';

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  const { currentUserName } = readConfig();

  if (!currentUserName) {
    throw new Error('There is no logged in user.');
  }

  return async (cmdName, ...args) => {
    const user = await getUserByName(currentUserName);

    if (!user) {
      throw new Error(
        `There's no user name that matches "${currentUserName}" in the database.`
      );
    }

    return handler(cmdName, user, ...args);
  };
}
