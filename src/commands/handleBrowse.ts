import { getPostsForUser } from '@/lib/db/queries/posts';
import { type UserCommandHandler } from './types';

export const handleBrowse: UserCommandHandler = async function (
  cmdName,
  user,
  ...args
) {
  const posts = await getPostsForUser(user.id);
  console.log(posts);
};
