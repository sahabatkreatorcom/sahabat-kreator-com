import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/db";
import { post, socialAccount } from "../../../../lib/db/schema";
import { publishToPlatform } from "../../../../lib/platforms/publish";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const db = await getDb();

  const posts = await db
    .select()
    .from(post)
    .where(and(eq(post.id, id), eq(post.userId, session.user.id)));

  if (posts.length === 0) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const target = posts[0];
  const now = new Date().toISOString();

  if (body.action === "publish") {
    const accounts = await db
      .select()
      .from(socialAccount)
      .where(eq(socialAccount.id, target.accountId));

    if (accounts.length === 0) {
      return NextResponse.json({ error: "Social account not found" }, { status: 404 });
    }

    const account = accounts[0];
    const mediaUrls = target.mediaUrls ? JSON.parse(target.mediaUrls) : undefined;

    try {
      const result = await publishToPlatform(account, target.content, mediaUrls);
      const [updated] = await db
        .update(post)
        .set({ status: "published", publishedAt: now, platformPostId: result.platformPostId, updatedAt: now })
        .where(eq(post.id, id))
        .returning();
      return NextResponse.json(updated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      const [updated] = await db
        .update(post)
        .set({ status: "failed", errorMessage, updatedAt: now })
        .where(eq(post.id, id))
        .returning();
      return NextResponse.json(updated);
    }
  }

  if (body.content !== undefined || body.scheduledAt !== undefined) {
    const updates: Record<string, string | null> = { updatedAt: now };
    if (body.content !== undefined) updates.content = body.content;
    if (body.scheduledAt !== undefined) {
      updates.scheduledAt = new Date(body.scheduledAt).toISOString();
      if (target.status === "draft") updates.status = "scheduled";
    }
    const [updated] = await db.update(post).set(updates).where(eq(post.id, id)).returning();
    return NextResponse.json(updated);
  }

  const [updated] = await db.update(post).set({ updatedAt: now }).where(eq(post.id, id)).returning();
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await getDb()
    .delete(post)
    .where(and(eq(post.id, id), eq(post.userId, session.user.id)));

  return NextResponse.json({ success: true });
}
