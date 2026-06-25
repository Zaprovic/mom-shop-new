import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/server/auth";

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

  // headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, first_name, last_name, email_addresses } = evt.data;

    if (!id || !email_addresses) {
      console.error("Missing user data in webhook payload");
      return new Response("Missing user data", { status: 400 });
    }

    await createUser({
      id,
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      email: email_addresses[0]?.email_address ?? "",
    });

    return new Response("User created", { status: 200 });
  }

  return new Response("", { status: 200 });
}
