import {
  createCommandsRegistry,
  registerCommand,
  runCommand,
} from '@/utils/registry';
import {
  type CommandHandler,
  addFeedHandler,
  aggHandler,
  feedsHandler,
  followHandler,
  followingHandler,
  loginHandler,
  registerHandler,
  resetHandler,
  usersHandler,
} from '@/commands';
import { middlewareLoggedIn } from '@/middleware/middlewareLoggedIn';

async function main() {
  const [cmdName, ...args] = process.argv.slice(2);
  const commandsRegistry = createCommandsRegistry();

  if (!cmdName) {
    console.log('Please provide a command name.');
    process.exit(1);
  }

  interface CommandEntry {
    name: string;
    handler: CommandHandler;
  }

  const commandsMap: CommandEntry[] = [
    {
      name: 'addfeed',
      handler: middlewareLoggedIn(addFeedHandler),
    },
    {
      name: 'agg',
      handler: aggHandler,
    },
    {
      name: 'feeds',
      handler: feedsHandler,
    },
    {
      name: 'follow',
      handler: middlewareLoggedIn(followHandler),
    },
    {
      name: 'following',
      handler: middlewareLoggedIn(followingHandler),
    },
    {
      name: 'login',
      handler: loginHandler,
    },
    {
      name: 'register',
      handler: registerHandler,
    },

    {
      name: 'reset',
      handler: resetHandler,
    },
    {
      name: 'users',
      handler: usersHandler,
    },
  ];

  // Add commands to the registry.
  for (const command of commandsMap) {
    registerCommand(commandsRegistry, command.name, command.handler);
  }

  await runCommand(commandsRegistry, cmdName, ...args);

  process.exit(0);
}

await main();
