const FB_GRAPH_URL = "https://graph.facebook.com/v25.0";

export class FacebookClient {
  constructor(private accessToken: string) {}

  async getPages() {
    const res = await fetch(
      `${FB_GRAPH_URL}/me/accounts?access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async getPageInsights(pageId: string, metric: string, period: string) {
    const res = await fetch(
      `${FB_GRAPH_URL}/${pageId}/insights?metric=${metric}&period=${period}&access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async publishPost(pageId: string, message: string) {
    const res = await fetch(`${FB_GRAPH_URL}/${pageId}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, access_token: this.accessToken }),
    });
    return res.json();
  }
}
