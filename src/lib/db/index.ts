import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/lib/db/schema';
import { readConfig } from '@/config';

const config = readConfig();
const connection = postgres(config.dbUrl);
export const db = drizzle(connection, { schema });
