export { addFeedHandler } from './addFeedHandler';
export { aggHandler } from './aggHandler';
export { feedsHandler } from './feedsHandler';
export { followHandler } from './followHandler';
export { followingHandler } from './followingHandler';
export { loginHandler } from './loginHandler';
export { registerHandler } from './registerHandler';
export { resetHandler } from './resetHandler';
export { usersHandler } from './usersHandler';

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;
