import { setUser } from './config';
import {
  type CommandHandler,
  createCommandsRegistry,
  registerCommand,
  runCommand,
} from './commands';

async function main() {
  const commandsRegistry = createCommandsRegistry();
  const cmdName = process.argv[2];
  const args = process.argv.slice(3);

  if (!cmdName) {
    console.log('Please provide a command name.');
    process.exit(1);
  }

  registerCommand(commandsRegistry, 'login', handlerLogin);
  runCommand(commandsRegistry, cmdName, ...args);
}

const handlerLogin: CommandHandler = async function (
  cmdName,
  ...args
): Promise<void> {
  if (args.length === 0) {
    console.log('Please provide a "username" argument.');
    process.exit(1);
  }

  const username = args[0];

  await setUser(username);

  console.log(`A new user name "${username}" has been created.`);
};

main();
