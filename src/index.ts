import {
  createCommandsRegistry,
  registerCommand,
  runCommand,
} from '@/utils/registry';
import { registerHandler, loginHandler } from '@/handlers';

async function main() {
  const [cmdName, ...args] = process.argv.slice(2);
  const commandsRegistry = createCommandsRegistry();

  if (!cmdName) {
    console.log('Please provide a command name.');
    process.exit(1);
  }

  // Add commands to the registry.
  registerCommand(commandsRegistry, 'register', registerHandler);
  registerCommand(commandsRegistry, 'login', loginHandler);

  await runCommand(commandsRegistry, cmdName, ...args);

  process.exit(0);
}

await main();
