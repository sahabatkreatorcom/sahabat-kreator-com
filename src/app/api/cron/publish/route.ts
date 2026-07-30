import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";
import { post, socialAccount } from "../../../../lib/db/schema";
import { publishToPlatform } from "../../../../lib/platforms/publish";
import { eq, lt, and, isNull } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const now = new Date().toISOString();

  const duePosts = await db
    .select()
    .from(post)
    .where(and(eq(post.status, "scheduled"), lt(post.scheduledAt!, now), isNull(post.publishedAt)));

  const results: Array<{ id: string; status: string; error?: string }> = [];

  for (const p of duePosts) {
    try {
      const accounts = await db
        .select()
        .from(socialAccount)
        .where(eq(socialAccount.id, p.accountId));

      if (accounts.length === 0) {
        await db.update(post).set({ status: "failed", errorMessage: "Account not found", updatedAt: now }).where(eq(post.id, p.id));
        results.push({ id: p.id, status: "failed", error: "Account not found" });
        continue;
      }

      const account = accounts[0];
      const mediaUrls = p.mediaUrls ? JSON.parse(p.mediaUrls) : undefined;
      const result = await publishToPlatform(account, p.content, mediaUrls);

      await db.update(post).set({ status: "published", publishedAt: now, platformPostId: result.platformPostId, updatedAt: now }).where(eq(post.id, p.id));
      results.push({ id: p.id, status: "published" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      await db.update(post).set({ status: "failed", errorMessage, updatedAt: now }).where(eq(post.id, p.id));
      results.push({ id: p.id, status: "failed", error: errorMessage });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
