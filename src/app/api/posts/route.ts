import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getDb } from "../../../lib/db";
import { post, socialAccount } from "../../../lib/db/schema";
import { publishToPlatform } from "../../../lib/platforms/publish";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import crypto from "crypto";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { accountId, content, mediaUrls, scheduledAt } = body;

  if (!accountId || !content) {
    return NextResponse.json({ error: "accountId and content required" }, { status: 400 });
  }

  const db = await getDb();

  const accounts = await db
    .select()
    .from(socialAccount)
    .where(eq(socialAccount.id, accountId));

  if (accounts.length === 0) {
    return NextResponse.json({ error: "Social account not found" }, { status: 404 });
  }

  const account = accounts[0];
  const now = new Date().toISOString();

  const [newPost] = await db
    .insert(post)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      accountId,
      platform: account.platform,
      content,
      mediaUrls: mediaUrls ? JSON.stringify(mediaUrls) : null,
      scheduledAt: scheduledAt ?? null,
      status: scheduledAt ? "scheduled" : "draft",
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (scheduledAt) {
    return NextResponse.json(newPost, { status: 201 });
  }

  try {
    const result = await publishToPlatform(account, content, mediaUrls);
    const [updated] = await db
      .update(post)
      .set({ status: "published", publishedAt: now, platformPostId: result.platformPostId, updatedAt: now })
      .where(eq(post.id, newPost.id))
      .returning();
    return NextResponse.json(updated, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    const [updated] = await db
      .update(post)
      .set({ status: "failed", errorMessage, updatedAt: now })
      .where(eq(post.id, newPost.id))
      .returning();
    return NextResponse.json(updated, { status: 201 });
  }
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.userId, session.user.id))
    .orderBy(post.createdAt);

  return NextResponse.json(posts);
}
