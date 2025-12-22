import { db } from "@/db";
import { user as userDb, type InsertUserType } from "@/db/schema";

export async function createUser(data: InsertUserType) {
  const [newUser] = await db
    .insert(userDb)
    .values(data)
    .onConflictDoNothing()
    .returning();
  return newUser;
}
