import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

// Force dynamic route to avoid build-time evaluation
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("🔔 Webhook received!");

  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    console.error(
      "❌ CLERK_WEBHOOK_SIGNING_SECRET not found in environment variables",
    );
    throw new Error(
      "Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("📋 Headers:", {
    svix_id,
    svix_timestamp,
    svix_signature: svix_signature ? "present" : "missing",
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log("📨 Event type:", eventType);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // Insert user into database
    try {
      // Initialize db connection at runtime
      const db = drizzle(process.env.DATABASE_URL!);

      await db.insert(userTable).values({
        id: id,
        email: email_addresses[0]?.email_address ?? "",
        firstName: first_name ?? "",
        lastName: last_name ?? "",
      });

      console.log(`✅ User ${id} created in database`);
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // Update user in database
    try {
      // Initialize db connection at runtime
      const db = drizzle(process.env.DATABASE_URL!);

      await db
        .update(userTable)
        .set({
          email: email_addresses[0]?.email_address ?? "",
          firstName: first_name ?? "",
          lastName: last_name ?? "",
        })
        .where(eq(userTable.id, id));

      console.log(`✅ User ${id} updated in database`);
    } catch (error) {
      console.error("Error updating user in database:", error);
      return new Response("Error updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error: no user ID", { status: 400 });
    }

    // Delete user from database
    try {
      // Initialize db connection at runtime
      const db = drizzle(process.env.DATABASE_URL!);

      await db.delete(userTable).where(eq(userTable.id, id));

      console.log(`✅ User ${id} deleted from database`);
    } catch (error) {
      console.error("Error deleting user from database:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
