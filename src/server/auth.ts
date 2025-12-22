import { db } from "@/db";
import { user as userDb, type InsertUserType } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createUser(data: InsertUserType) {
  const [newUser] = await db
    .insert(userDb)
    .values(data)
    .onConflictDoNothing()
    .returning();
  return newUser;
}

export async function getUser() {
  const clerkUser = await currentUser();
  console.log(clerkUser);
  if (!clerkUser) return null;

  const [user] = await db
    .select()
    .from(userDb)
    .where(eq(userDb.id, clerkUser.id));

  if (!user) {
    return await createUser({
      id: clerkUser.id,
      firstName: clerkUser.firstName ?? "",
      lastName: clerkUser.lastName ?? "",
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
    });
  }
  return user;
}
