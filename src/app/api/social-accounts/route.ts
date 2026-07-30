import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getDb } from "../../../lib/db";
import { socialAccount } from "../../../lib/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { exchangeCodeForToken, fetchAccountInfo } from "../../../lib/platforms/exchange";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accounts = await getDb()
    .select()
    .from(socialAccount)
    .where(eq(socialAccount.userId, session.user.id));

  const sanitized = accounts.map((a) => ({
    ...a,
    accessToken: "***",
    refreshToken: "***",
  }));

  return NextResponse.json(sanitized);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { platform, code, redirectUri } = body;

  if (!platform || !code) {
    return NextResponse.json(
      { error: "Platform and code required" },
      { status: 400 },
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(platform, code, redirectUri);
    const accountInfo = await fetchAccountInfo(platform, tokenData.accessToken);
    const firstPage = accountInfo.pages?.[0];
    const savedToken = firstPage?.accessToken ?? tokenData.accessToken;
    const fbPage = platform === "facebook" && firstPage
      ? { accountId: firstPage.id, accountName: firstPage.name, avatarUrl: firstPage.avatar }
      : { accountId: accountInfo.id, accountName: accountInfo.name, avatarUrl: accountInfo.avatar };

    const existing = await getDb()
      .select()
      .from(socialAccount)
      .where(
        and(
          eq(socialAccount.accountId, fbPage.accountId),
          eq(socialAccount.platform, platform),
        ),
      );

    if (existing.length > 0) {
      const result = await getDb()
        .update(socialAccount)
        .set({
          accessToken: savedToken,
          refreshToken: tokenData.refreshToken ?? null,
          tokenExpiresAt: tokenData.expiresAt
            ? new Date(tokenData.expiresAt).toISOString()
            : null,
          accountName: fbPage.accountName,
          avatarUrl: fbPage.avatarUrl ?? null,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(socialAccount.id, existing[0].id))
        .returning();

      return NextResponse.json(result[0]);
    }

    const accountCount = await getDb()
      .select()
      .from(socialAccount)
      .where(eq(socialAccount.userId, session.user.id));

    const user = await getDb().query.user.findFirst({
      where: (u, { eq }) => eq(u.id, session.user.id),
    });

    const { PLANS } = await import("../../../config/plans");
    const plan = PLANS[user?.planId as keyof typeof PLANS] ?? PLANS.free;

    if (accountCount.length >= plan.maxAccounts) {
      return NextResponse.json(
        {
          error: `Batas akun (${plan.maxAccounts}) telah tercapai. Upgrade paket untuk menambah akun.`,
        },
        { status: 403 },
      );
    }

    const result = await getDb()
      .insert(socialAccount)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        platform,
        accountName: fbPage.accountName,
        accountId: fbPage.accountId,
        avatarUrl: fbPage.avatarUrl ?? null,
        accessToken: savedToken,
        refreshToken: tokenData.refreshToken ?? null,
        tokenExpiresAt: tokenData.expiresAt
          ? new Date(tokenData.expiresAt).toISOString()
          : null,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error connecting account:", error);
    return NextResponse.json(
      { error: "Gagal menghubungkan akun. Silakan coba lagi." },
      { status: 500 },
    );
  }
}


