import { type CommandHandler } from '@/commands/types';

export type CommandsRegistry = Record<string, CommandHandler>;

export function createCommandsRegistry() {
  return {} as CommandsRegistry;
}

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> {
  await registry[cmdName](cmdName, ...args);
}

export function checkArgValidity(
  passingCondition: boolean,
  argName: string
): void {
  if (!passingCondition) {
    console.log(`Please provide a valid value for "${argName}".`);
    console.log('');
    process.exit(1);
  }
}
