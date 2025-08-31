import {
  createCommandsRegistry,
  registerCommand,
  runCommand,
} from '@/utils/registry';
import { type CommandHandler } from '@/commands/types';
import { handleAddFeed } from '@/commands/handleAddFeed';
import { handleAgg } from '@/commands/handleAgg';
import { handleFeeds } from '@/commands/handleFeeds';
import { handleFollow } from '@/commands/handleFollow';
import { handleFollowing } from '@/commands/handleFollowing';
import { handleLogin } from '@/commands/handleLogin';
import { handleRegister } from '@/commands/handleRegister';
import { handleReset } from '@/commands/handleReset';
import { handleUnfollow } from '@/commands/handleUnfollow';
import { handleUsers } from '@/commands/handleUsers';
import { middlewareLoggedIn } from '@/middleware/middlewareLoggedIn';
import { handleBrowse } from './commands/handleBrowse';

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
      handler: middlewareLoggedIn(handleAddFeed),
    },
    {
      name: 'agg',
      handler: handleAgg,
    },
    {
      name: 'browse',
      handler: middlewareLoggedIn(handleBrowse),
    },
    {
      name: 'feeds',
      handler: handleFeeds,
    },
    {
      name: 'follow',
      handler: middlewareLoggedIn(handleFollow),
    },
    {
      name: 'following',
      handler: middlewareLoggedIn(handleFollowing),
    },
    {
      name: 'login',
      handler: handleLogin,
    },
    {
      name: 'register',
      handler: handleRegister,
    },
    {
      name: 'reset',
      handler: handleReset,
    },
    {
      name: 'unfollow',
      handler: middlewareLoggedIn(handleUnfollow),
    },
    {
      name: 'users',
      handler: middlewareLoggedIn(handleUsers),
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
