const IG_GRAPH_URL = "https://graph.instagram.com/v25.0";

export class InstagramDirectClient {
  constructor(private accessToken: string) {}

  async getProfile() {
    const res = await fetch(
      `${IG_GRAPH_URL}/me?fields=user_id,username,name,profile_picture_url&access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async getMedia(igUserId: string) {
    const res = await fetch(
      `${IG_GRAPH_URL}/${igUserId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async getInsights(igUserId: string, metric: string, period: string) {
    const res = await fetch(
      `${IG_GRAPH_URL}/${igUserId}/insights?metric=${metric}&period=${period}&access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async createMediaContainer(
    igUserId: string,
    mediaType: string,
    mediaUrl: string,
    caption: string,
  ) {
    const res = await fetch(`${IG_GRAPH_URL}/${igUserId}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_type: mediaType,
        media_url: mediaUrl,
        caption,
        access_token: this.accessToken,
      }),
    });
    return res.json();
  }

  async publishContainer(igUserId: string, creationId: string) {
    const res = await fetch(`${IG_GRAPH_URL}/${igUserId}/media_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: this.accessToken,
      }),
    });
    return res.json();
  }
}
