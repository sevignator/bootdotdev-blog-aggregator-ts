import { type UserCommandHandler } from './types';
import { getAllUsers } from '@/lib/db/queries/users';

export const handleUsers: UserCommandHandler = async function (
  cmdName,
  user,
  ...args
) {
  const users = await getAllUsers();

  for (const currentUser of users) {
    console.log(
      `* ${user.name}`,
      user.name === currentUser.name ? '(current)' : ''
    );
  }
};
