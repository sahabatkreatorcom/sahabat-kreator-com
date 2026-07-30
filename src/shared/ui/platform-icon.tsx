import type { Platform } from "../../core/value-objects/platform";
import { FacebookIcon, InstagramIcon, ThreadsIcon, LinkedInIcon, YouTubeIcon, TikTokIcon, PinterestIcon } from "./platform-icons";

type Props = {
  platform: Platform;
  className?: string;
};

export function PlatformIcon({ platform, className = "h-5 w-5" }: Props) {
  switch (platform) {
    case "facebook":
      return <FacebookIcon className={className} />;
    case "instagram":
    case "instagram_direct":
      return <InstagramIcon className={className} />;
    case "threads":
      return <ThreadsIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "youtube":
      return <YouTubeIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    case "pinterest":
      return <PinterestIcon className={className} />;
    default:
      return <span className={`${className} rounded-full bg-gray-300`} />;
  }
}
