import { getDb } from "../db";
import { socialAccount } from "../db/schema";
import { eq } from "drizzle-orm";

type SocialAccount = typeof socialAccount.$inferSelect;

const REFRESH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

async function updateAccount(
  account: SocialAccount,
  accessToken: string,
  refreshToken: string | null,
  expiresInSeconds: number,
): Promise<SocialAccount> {
  const tokenExpiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
  await getDb()
    .update(socialAccount)
    .set({
      accessToken,
      refreshToken,
      tokenExpiresAt,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(socialAccount.id, account.id));

  return { ...account, accessToken, refreshToken, tokenExpiresAt };
}

export async function refreshTokenIfNeeded(
  account: SocialAccount,
): Promise<SocialAccount> {
  const expiresAt = account.tokenExpiresAt
    ? new Date(account.tokenExpiresAt).getTime()
    : null;
  const nearExpiry =
    expiresAt !== null && expiresAt - Date.now() < REFRESH_WINDOW_MS;

  if (account.platform === "threads") {
    if (!nearExpiry) return account;
    const res = await fetch(
      "https://graph.threads.net/v1.0/refresh_access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "th_refresh_token",
          access_token: account.accessToken,
          client_id: process.env.THREADS_CLIENT_ID ?? "",
          client_secret: process.env.THREADS_CLIENT_SECRET ?? "",
        }),
      },
    );
    const data = await res.json();
    if (!data.access_token) {
      throw new Error(`Threads token refresh gagal: ${JSON.stringify(data)}`);
    }
    return updateAccount(account, data.access_token, null, data.expires_in ?? 5184000);
  }

  if (account.platform === "youtube") {
    if (!account.refreshToken) return account;
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: account.refreshToken,
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
    });
    const data = await res.json();
    if (!data.access_token) {
      throw new Error(`YouTube token refresh gagal: ${JSON.stringify(data)}`);
    }
    return updateAccount(
      account,
      data.access_token,
      data.refresh_token ?? account.refreshToken,
      data.expires_in ?? 3600,
    );
  }

  if (account.platform === "linkedin") {
    if (!account.refreshToken) return account;
    const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: account.refreshToken,
        client_id: process.env.LINKEDIN_CLIENT_ID ?? "",
        client_secret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      }),
    });
    const data = await res.json();
    if (!data.access_token) {
      throw new Error(`LinkedIn token refresh gagal: ${JSON.stringify(data)}`);
    }
    return updateAccount(
      account,
      data.access_token,
      data.refresh_token ?? account.refreshToken,
      data.expires_in ?? 3600,
    );
  }

  return account;
}
