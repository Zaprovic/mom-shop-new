import { db } from "@/db";
import { user as userDb } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createUserIfNotExists() {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const { id } = user;

  const existingUser = await db
    .select()
    .from(userDb)
    .where(eq(userDb.id, user.id));

  if (existingUser.length === 0) {
    await db.insert(userDb).values({
      id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    });
  }
}
