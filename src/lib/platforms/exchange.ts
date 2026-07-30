export async function exchangeCodeForToken(
  platform: string,
  code: string,
  redirectUri?: string,
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const configs: Record<string, { url: string; body: Record<string, string> }> =
    {
      facebook: {
        url: "https://graph.facebook.com/v25.0/oauth/access_token",
        body: {
          client_id: process.env.FB_CLIENT_ID ?? "",
          client_secret: process.env.FB_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/facebook`,
          code,
        },
      },
      instagram: {
        url: "https://graph.facebook.com/v25.0/oauth/access_token",
        body: {
          client_id: process.env.FB_CLIENT_ID ?? "",
          client_secret: process.env.FB_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/instagram`,
          code,
        },
      },
      instagram_direct: {
        url: "https://api.instagram.com/oauth/access_token",
        body: {
          client_id: process.env.INSTAGRAM_APP_ID ?? "",
          client_secret: process.env.INSTAGRAM_APP_SECRET ?? "",
          grant_type: "authorization_code",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/instagram_direct`,
          code,
        },
      },
      threads: {
        url: "https://graph.threads.net/v1.0/oauth/access_token",
        body: {
          client_id: process.env.THREADS_CLIENT_ID ?? "",
          client_secret: process.env.THREADS_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/threads`,
          code,
        },
      },
      linkedin: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
        body: {
          grant_type: "authorization_code",
          client_id: process.env.LINKEDIN_CLIENT_ID ?? "",
          client_secret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/linkedin`,
          code,
        },
      },
      youtube: {
        url: "https://oauth2.googleapis.com/token",
        body: {
          client_id: process.env.GOOGLE_CLIENT_ID ?? "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/youtube`,
          grant_type: "authorization_code",
          code,
        },
      },
      tiktok: {
        url: "https://open-api.tiktok.com/oauth/access_token/",
        body: {
          client_key: process.env.TIKTOK_CLIENT_KEY ?? "",
          client_secret: process.env.TIKTOK_CLIENT_SECRET ?? "",
          grant_type: "authorization_code",
          code,
        },
      },
      pinterest: {
        url: "https://api.pinterest.com/v5/oauth/token",
        body: {
          grant_type: "authorization_code",
          client_id: process.env.PINTEREST_CLIENT_ID ?? "",
          client_secret: process.env.PINTEREST_CLIENT_SECRET ?? "",
          redirect_uri: redirectUri ?? `${baseUrl}/api/auth/callback/pinterest`,
          code,
        },
      },
    };

  const config = configs[platform];
  if (!config) throw new Error(`Unknown platform: ${platform}`);

  const res = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(config.body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Token exchange failed: ${errBody}`);
  }

  const data = await res.json();

  if (platform === "instagram_direct" && data.access_token) {
    const longRes = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${data.access_token}`,
    );
    if (longRes.ok) {
      const longData = await longRes.json();
      data.access_token = longData.access_token ?? data.access_token;
      data.expires_in = longData.expires_in ?? data.expires_in;
    }
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? null,
    expiresAt: data.expires_in
      ? new Date(Date.now() + data.expires_in * 1000).toISOString()
      : null,
  };
}

export async function fetchAccountInfo(platform: string, accessToken: string) {
  switch (platform) {
    case "facebook": {
      const meRes = await fetch(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${accessToken}`,
      );
      const me = await meRes.json();
      const pagesRes = await fetch(
        `https://graph.facebook.com/me/accounts?fields=id,name,picture,access_token&access_token=${accessToken}`,
      );
      const pagesData = await pagesRes.json();
      const pages: any[] = (pagesData.data ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        avatar: p.picture?.data?.url ?? null,
        accessToken: p.access_token,
      }));
      return { id: me.id, name: me.name, avatar: me.picture?.data?.url, pages };
    }
    case "instagram": {
      const pagesRes = await fetch(
        `https://graph.facebook.com/v25.0/me/accounts?fields=id,name,access_token&access_token=${accessToken}`,
      );
      const pagesData = await pagesRes.json();
      const pages: { id: string; name: string; access_token: string }[] = pagesData.data ?? [];
      if (pages.length === 0) {
        throw new Error("Tidak ada Facebook Page ditemukan. Kamu harus memiliki Facebook Page untuk menghubungkan Instagram.");
      }
      for (const page of pages) {
        const igRes = await fetch(
          `https://graph.facebook.com/v25.0/${page.id}?fields=instagram_business_account{id,username,profile_picture_url}&access_token=${page.access_token}`,
        );
        const igData = await igRes.json();
        const ig = igData.instagram_business_account;
        if (ig?.id) {
          return { id: ig.id, name: ig.username, avatar: ig.profile_picture_url, pages };
        }
      }
      throw new Error("Tidak ada Instagram Business Account terhubung. Pastikan kamu sudah menghubungkan Instagram Business ke halaman Facebook kamu.");
    }
    case "instagram_direct": {
      const res = await fetch(
        `https://graph.instagram.com/v25.0/me?fields=user_id,username,name,profile_picture_url&access_token=${accessToken}`,
      );
      const data = await res.json();
      if (!data.user_id) {
        if (data.error?.code === 100) {
          throw new Error("Instagram (Direct): Tambahkan akun Instagram kamu sebagai Instagram Tester di Meta Developer Console → App Roles → Instagram Testers, lalu terima undangannya. Atau ajukan App Review untuk akses publik.");
        }
        throw new Error("Gagal mengambil data akun Instagram: " + (data.error?.message ?? JSON.stringify(data)));
      }
      return {
        id: data.user_id,
        name: data.username ?? data.name,
        avatar: data.profile_picture_url,
      };
    }
    case "threads": {
      const res = await fetch(
        `https://graph.threads.net/v1.0/me?fields=id,name,username,threads_profile_picture_url&access_token=${accessToken}`,
      );
      const data = await res.json();
      return {
        id: data.id,
        name: data.name ?? data.username,
        avatar: data.threads_profile_picture_url,
      };
    }
    case "linkedin": {
      const res = await fetch("https://api.linkedin.com/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      return {
        id: data.sub,
        name: `${data.givenName ?? ""} ${data.familyName ?? ""}`.trim(),
        avatar: null,
      };
    }
    case "youtube": {
      const res = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const data = await res.json();
      const item = data.items?.[0];
      return {
        id: item?.id,
        name: item?.snippet?.title,
        avatar: item?.snippet?.thumbnails?.default?.url,
      };
    }
    case "tiktok": {
      const res = await fetch("https://open-api.tiktok.com/user/info/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });
      const data = await res.json();
      const user = data.data?.user;
      return {
        id: user?.open_id,
        name: user?.display_name ?? user?.username,
        avatar: user?.avatar_url,
      };
    }
    case "pinterest": {
      const res = await fetch("https://api.pinterest.com/v5/user_account", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      return {
        id: data.username,
        name: data.username,
        avatar: data.profile_image,
      };
    }
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}
