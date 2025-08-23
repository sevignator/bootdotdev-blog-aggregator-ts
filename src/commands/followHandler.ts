import { type UserCommandHandler } from '.';
import { checkArgValidity } from '@/utils/registry';
import { createFeedFollow } from '@/lib/db/queries/feedfollows';
import { getFeedByUrl } from '@/lib/db/queries/feeds';

export const followHandler: UserCommandHandler = async function (
  cmd,
  user,
  ...args
) {
  const [feedURL] = args;
  checkArgValidity(feedURL !== undefined, 'feedURL');

  const feed = await getFeedByUrl(feedURL);

  await createFeedFollow(user.id, feed.id);

  console.log(
    `The user "${user.name}" is now following the feed "${feed.name}"`
  );
};
