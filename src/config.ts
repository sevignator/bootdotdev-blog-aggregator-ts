import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

import { convertCamelToSnake, convertSnakeToCamel } from '@/utils/text';

interface Config {
  dbUrl: string;
  currentUserName: string;
}

/**
 * @description
 * Writes a `Config` object to the JSON config file after setting the
 * `current_user_name` field.
 */
export function setUser(name: string): void {
  const config = readConfig();
  config.currentUserName = name;

  writeConfig(config);
}

/**
 * @description
 * Reads the JSON config file and returns a `Config` object.
 */
export function readConfig(): Config {
  const configFilePath = getConfigFilePath();
  const configJSON = fs.readFileSync(configFilePath, 'utf-8');
  const serializedConfig = JSON.parse(configJSON);
  const config = Object.keys(serializedConfig).reduce((obj, key) => {
    const camelKey = convertSnakeToCamel(key) as keyof Config;
    const value = serializedConfig[key];

    return {
      ...obj,
      [camelKey]: value,
    };
  }, {}) as Config;

  return config;
}

/**
 * @description
 * Writes to the JSON config file, converting key names from camelCase to
 * snake_case in the process.
 */
export function writeConfig(config: Config): void {
  const configFilePath = getConfigFilePath();
  const formattedConfig = Object.keys(config).reduce((obj, key) => {
    const snakeKey = convertCamelToSnake(key);
    const value = config[key as keyof Config];

    return {
      ...obj,
      [snakeKey]: value,
    };
  }, {});

  fs.writeFileSync(configFilePath, JSON.stringify(formattedConfig));
}

/**
 * @description
 * Gets the path to the `.gatorconfig.json` file from the user's HOME directory.
 */
function getConfigFilePath(): string {
  const homeDir = os.homedir();
  const configFilePath = path.join(homeDir, '.gatorconfig.json');
  return configFilePath;
}
