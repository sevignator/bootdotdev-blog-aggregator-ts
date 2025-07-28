import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

import { convertCamelToSnake, convertSnakeToCamel } from './utils';

interface Config {
  dbUrl: string;
  currentUserName: string;
}

/**
 * @description
 * Writes a `Config` object to the JSON config file after setting the
 * `current_user_name` field.
 */
export async function setUser(name: string): Promise<void> {
  const config = await readConfig();
  config.currentUserName = name;

  await writeConfig(config);
}

/**
 * @description
 * Reads the JSON config file and returns a `Config` object.
 */
export async function readConfig(): Promise<Config> {
  const configFilePath = getConfigFilePath();
  const configJSON = await fs.readFile(configFilePath, {
    encoding: 'utf-8',
  });
  const serializedConfig = JSON.parse(configJSON);
  const config = Object.keys(serializedConfig).reduce((obj, key) => {
    const camelKey = convertSnakeToCamel(key) as keyof Config;
    const value = serializedConfig[key]

    return {
      ...obj,
      [camelKey]: value
    }
  }, {}) as Config;

  return config;
}

/**
 * @description
 * Writes to the JSON config file, converting key names from camelCase to
 * snake_case in the process.
 */
export async function writeConfig(config: Config): Promise<void> {
  const configFilePath = getConfigFilePath();
  const formattedConfig = Object.keys(config).reduce((obj, key) => {
    const snakeKey = convertCamelToSnake(key);
    const value = config[key as keyof Config];

    return {
      ...obj,
      [snakeKey]: value
    }
  }, {});

  await fs.writeFile(configFilePath, JSON.stringify(formattedConfig));
}

/**
 * @description
 * Gets the path to the `.gatorconfig.json` file from the user's HOME directory.
 */
function getConfigFilePath(): string {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const configFilePath = path.join(__dirname, '../', '.gatorconfig.json');

  return configFilePath;
}
