import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/db";
import { socialAccount, post } from "../../../../lib/db/schema";
import { eq, count, and, gte, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const accountCount = await getDb()
    .select({ count: count() })
    .from(socialAccount)
    .where(eq(socialAccount.userId, userId));

  const totalPosts = await getDb()
    .select({ count: count() })
    .from(post)
    .where(eq(post.userId, userId));

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const postsThisMonth = await getDb()
    .select({ count: count() })
    .from(post)
    .where(and(eq(post.userId, userId), gte(post.createdAt, thirtyDaysAgo)));

  const accountsByPlatform = await getDb()
    .select({ platform: socialAccount.platform, count: count() })
    .from(socialAccount)
    .where(eq(socialAccount.userId, userId))
    .groupBy(socialAccount.platform);

  const postsByStatus = await getDb()
    .select({ status: post.status, count: count() })
    .from(post)
    .where(eq(post.userId, userId))
    .groupBy(post.status);

  return NextResponse.json({
    totalAccounts: accountCount[0]?.count ?? 0,
    totalPosts: totalPosts[0]?.count ?? 0,
    postsThisMonth: postsThisMonth[0]?.count ?? 0,
    accountsByPlatform: Object.fromEntries(
      accountsByPlatform.map((a) => [a.platform, a.count]),
    ),
    postsByStatus: Object.fromEntries(
      postsByStatus.map((p) => [p.status, p.count]),
    ),
  });
}
