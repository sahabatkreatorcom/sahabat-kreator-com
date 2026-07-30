const THREADS_GRAPH_URL = "https://graph.threads.net/v1.0";

export class ThreadsClient {
  constructor(private accessToken: string) {}

  async getProfile(userId: string) {
    const res = await fetch(
      `${THREADS_GRAPH_URL}/${userId}?fields=id,name,username,threads_profile_picture_url&access_token=${this.accessToken}`,
    );
    return res.json();
  }

  async createThread(text: string) {
    const res = await fetch(`${THREADS_GRAPH_URL}/me/threads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        access_token: this.accessToken,
      }),
    });
    return res.json();
  }

  async publishThread(creationId: string) {
    const res = await fetch(`${THREADS_GRAPH_URL}/me/threads_publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: this.accessToken,
      }),
    });
    return res.json();
  }

  async getInsights(userId: string, metric: string, period: string) {
    const res = await fetch(
      `${THREADS_GRAPH_URL}/${userId}/insights?metric=${metric}&period=${period}&access_token=${this.accessToken}`,
    );
    return res.json();
  }
}
