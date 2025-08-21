import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function getUserFromId(id: string) {
  const [result] = await db.select().from(users).where(eq(users.id, id));
  return result;
}

export async function getAllUsers() {
  const result = await db.select({ name: users.name }).from(users);
  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
}
