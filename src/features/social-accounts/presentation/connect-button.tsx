"use client";

import { useState } from "react";
import { PLATFORM_CONFIG } from "../../../config/platforms";
import type { Platform } from "../../../core/value-objects/platform";
import { PlatformIcon } from "../../../shared/ui/platform-icon";

const PLATFORMS: Platform[] = [
  "facebook",
  "instagram",
  "instagram_direct",
  "threads",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest",
];

export function ConnectButton() {
  const [open, setOpen] = useState(false);

  function getOAuthUrl(platform: Platform): string {
    const baseUrl = window.location.origin;
    const config = PLATFORM_CONFIG[platform];

    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/v25.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/facebook&scope=${config.scopes.join(",")}&response_type=code&auth_type=rerequest`;
      case "instagram":
        return `https://www.facebook.com/v25.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/instagram&scope=${config.scopes.join(",")}&response_type=code&auth_type=rerequest`;
      case "instagram_direct":
        return `https://www.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${baseUrl}/api/auth/callback/instagram_direct&scope=${config.scopes.join(",")}&response_type=code&enable_fb_login=0`;
      case "threads":
        return `https://www.threads.net/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_THREADS_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/threads&scope=${config.scopes.join(",")}&response_type=code`;
      case "linkedin":
        return `https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/linkedin&scope=${config.scopes.join("%20")}&response_type=code`;
      case "youtube":
        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/youtube&scope=${config.scopes.join(" ")}&response_type=code&access_type=offline&prompt=consent`;
      case "tiktok":
        return `https://www.tiktok.com/v2/auth/authorize?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&redirect_uri=${baseUrl}/api/auth/callback/tiktok&scope=${config.scopes.join(",")}&response_type=code`;
      case "pinterest":
        return `https://www.pinterest.com/oauth/?client_id=${process.env.NEXT_PUBLIC_PINTEREST_CLIENT_ID}&redirect_uri=${baseUrl}/api/auth/callback/pinterest&scope=${config.scopes.join(",")}&response_type=code`;
      default:
        return "#";
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Hubungkan Akun
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border bg-white shadow-lg">
            <div className="p-2">
              <p className="px-2 py-1 text-xs font-medium text-gray-500">
                Pilih Platform
              </p>
              {PLATFORMS.map((platform) => {
                const config = PLATFORM_CONFIG[platform];
                return (
                  <a
                    key={platform}
                    href={getOAuthUrl(platform)}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                  >
                    <PlatformIcon platform={platform} className="h-4 w-4" />
                    {config.label}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
