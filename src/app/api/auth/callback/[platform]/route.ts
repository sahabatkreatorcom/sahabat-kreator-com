import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { getDb } from "../../../../../lib/db";
import { socialAccount } from "../../../../../lib/db/schema";
import { eq, and } from "drizzle-orm";
import { exchangeCodeForToken, fetchAccountInfo } from "../../../../../lib/platforms/exchange";
import { headers } from "next/headers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { platform } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const requestUrl = new URL(_request.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");

  if (errorParam || !code) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?connect=error&reason=${errorParam || "no_code"}`,
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.redirect(
      `${baseUrl}/login?redirect=/api/auth/callback/${platform}?code=${code}`,
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(
      platform,
      code,
      `${baseUrl}/api/auth/callback/${platform}`,
    );
    const accountInfo = await fetchAccountInfo(platform, tokenData.accessToken);

    const selectable = accountInfo.pages ?? accountInfo.channels;

    if (
      (platform === "facebook" || platform === "youtube") &&
      selectable &&
      selectable.length > 1
    ) {
      const count = await getDb().select().from(socialAccount).where(eq(socialAccount.userId, session.user.id));
      const u = await getDb().query.user.findFirst({ where: (u2, { eq }) => eq(u2.id, session.user.id) });
      const { PLANS } = await import("../../../../../config/plans");
      const plan = PLANS[u?.planId as keyof typeof PLANS] ?? PLANS.free;
      if (count.length >= plan.maxAccounts) {
        return NextResponse.redirect(`${baseUrl}/dashboard/accounts?connect=error&reason=limit`);
      }

      const inserted = await getDb().insert(socialAccount).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        platform: platform as any,
        accountName: accountInfo.name,
        accountId: accountInfo.id,
        avatarUrl: accountInfo.avatar ?? null,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken ?? null,
        tokenExpiresAt: tokenData.expiresAt ? new Date(tokenData.expiresAt).toISOString() : null,
        platformMetadata: JSON.stringify(selectable),
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).returning();

      return NextResponse.redirect(`${baseUrl}/dashboard/accounts?connect=pending&accountId=${inserted[0].id}`);
    }

    const firstSelectable = selectable?.[0];

    if ((platform === "facebook" || platform === "youtube") && !firstSelectable) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?connect=error&reason=${platform === "youtube" ? "no_channel" : "no_page"}`,
      );
    }

    const savedToken = firstSelectable?.accessToken ?? tokenData.accessToken;
    const fbPage = firstSelectable
      ? { accountId: firstSelectable.id, accountName: firstSelectable.name, avatarUrl: firstSelectable.avatar }
      : { accountId: accountInfo.id, accountName: accountInfo.name, avatarUrl: accountInfo.avatar };

    const existing = await getDb()
      .select()
      .from(socialAccount)
      .where(
        and(
          eq(socialAccount.accountId, fbPage.accountId),
          eq(socialAccount.platform, platform as any),
        ),
      );

    if (existing.length > 0) {
      await getDb()
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
        .where(eq(socialAccount.id, existing[0].id));

      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?connect=success&updated=true`,
      );
    }

    const accountCount = await getDb()
      .select()
      .from(socialAccount)
      .where(eq(socialAccount.userId, session.user.id));

    const user = await getDb().query.user.findFirst({
      where: (u, { eq }) => eq(u.id, session.user.id),
    });

    const { PLANS } = await import("../../../../../config/plans");
    const plan = PLANS[user?.planId as keyof typeof PLANS] ?? PLANS.free;

    if (accountCount.length >= plan.maxAccounts) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?connect=error&reason=limit`,
      );
    }

    await getDb()
      .insert(socialAccount)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        platform: platform as any,
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
      });

    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?connect=success`,
    );
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?connect=error&reason=exchange`,
    );
  }
}
