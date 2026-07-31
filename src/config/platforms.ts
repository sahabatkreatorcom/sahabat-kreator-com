import type { Platform } from "../core/value-objects/platform";

export const PLATFORM_CONFIG: Record<
  Platform,
  {
    label: string;
    color: string;
    icon: string;
    authType: "oauth" | "api_key";
    scopes: string[];
    docsUrl: string;
  }
> = {
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    icon: "facebook",
    authType: "oauth",
    scopes: [
      "pages_read_engagement",
      "pages_manage_posts",
      "pages_read_user_content",
      "pages_show_list",
      "business_management",
    ],
    docsUrl: "https://developers.facebook.com/docs/graph-api",
  },
  instagram: {
    label: "Instagram (via Facebook)",
    color: "#E4405F",
    icon: "instagram",
    authType: "oauth",
    scopes: [
      "instagram_basic",
      "instagram_content_publish",
      "instagram_manage_comments",
      "instagram_manage_insights",
      "pages_show_list",
      "pages_read_engagement",
      "business_management",
    ],
    docsUrl: "https://developers.facebook.com/docs/instagram-api",
  },
  instagram_direct: {
    label: "Instagram (Direct)",
    color: "#E4405F",
    icon: "instagram",
    authType: "oauth",
    scopes: [
      "instagram_business_basic",
      "instagram_business_content_publish",
      "instagram_business_manage_comments",
      "instagram_business_manage_messages",
      "instagram_business_manage_insights",
    ],
    docsUrl: "https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login",
  },
  threads: {
    label: "Threads",
    color: "#000000",
    icon: "threads",
    authType: "oauth",
    scopes: [
      "threads_basic",
      "threads_content_publish",
      "threads_read_replies",
      "threads_manage_insights",
    ],
    docsUrl: "https://developers.facebook.com/docs/threads",
  },
  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
    icon: "linkedin",
    authType: "oauth",
    scopes: [
      "openid",
      "profile",
      "w_member_social",
      "w_organization_social",
      "r_organization_social",
    ],
    docsUrl: "https://learn.microsoft.com/en-us/linkedin/marketing/",
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    icon: "youtube",
    authType: "oauth",
    scopes: [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/yt-analytics.readonly",
    ],
    docsUrl: "https://developers.google.com/youtube/v3",
  },
  tiktok: {
    label: "TikTok",
    color: "#000000",
    icon: "tiktok",
    authType: "oauth",
    scopes: ["user.info.basic", "video.publish", "video.upload", "video.list"],
    docsUrl: "https://developers.tiktok.com/",
  },
  pinterest: {
    label: "Pinterest",
    color: "#BD081C",
    icon: "pinterest",
    authType: "oauth",
    scopes: [
      "boards:read",
      "boards:write",
      "pins:read",
      "pins:write",
      "user_accounts:read",
    ],
    docsUrl: "https://developers.pinterest.com/docs/api/v5",
  },
};
