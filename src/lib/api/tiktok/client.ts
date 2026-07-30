const TIKTOK_API_URL = "https://open-api.tiktok.com";

export class TikTokClient {
  constructor(private accessToken: string) {}

  async getUserInfo() {
    const res = await fetch(`${TIKTOK_API_URL}/user/info/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: this.accessToken }),
    });
    return res.json();
  }

  async uploadVideo(videoUrl: string, caption: string) {
    const res = await fetch(`${TIKTOK_API_URL}/video/publish/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: this.accessToken,
        video_url: videoUrl,
        caption,
        privacy_level: "PUBLIC",
      }),
    });
    return res.json();
  }

  async listVideos() {
    const res = await fetch(`${TIKTOK_API_URL}/video/list/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: this.accessToken,
        max_count: 20,
      }),
    });
    return res.json();
  }
}
