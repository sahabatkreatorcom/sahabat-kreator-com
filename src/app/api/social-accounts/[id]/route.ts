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

  if (!pageId || !pageAccessToken) {
    return NextResponse.json({ error: "pageId and pageAccessToken required" }, { status: 400 });
  }

  const result = await getDb()
    .update(socialAccount)
    .set({
      accountId: pageId,
      accountName: pageName,
      avatarUrl: pageAvatar ?? null,
      accessToken: pageAccessToken,
      isActive: true,
      platformMetadata: null,
      updatedAt: new Date().toISOString(),
    })
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
