import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/db";
import { socialAccount } from "../../../../lib/db/schema";
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
  const { pageId, pageAccessToken, pageName, pageAvatar } = body;

  if (!pageId) {
    return NextResponse.json({ error: "pageId required" }, { status: 400 });
  }

  const update: Record<string, unknown> = {
    accountId: pageId,
    accountName: pageName,
    avatarUrl: pageAvatar ?? null,
    isActive: true,
    platformMetadata: null,
    updatedAt: new Date().toISOString(),
  };
  if (pageAccessToken) {
    update.accessToken = pageAccessToken;
  }

  const result = await getDb()
    .update(socialAccount)
    .set(update)
    .where(and(eq(socialAccount.id, id), eq(socialAccount.userId, session.user.id)))
    .returning();

  return NextResponse.json(result[0]);
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
    .delete(socialAccount)
    .where(
      and(eq(socialAccount.id, id), eq(socialAccount.userId, session.user.id)),
    );

  return NextResponse.json({ success: true });
}
