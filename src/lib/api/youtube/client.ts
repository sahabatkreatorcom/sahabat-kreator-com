const YT_API_URL = "https://www.googleapis.com/youtube/v3";

export class YouTubeClient {
  constructor(private accessToken: string) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async getChannel() {
    const res = await fetch(
      `${YT_API_URL}/channels?part=snippet,statistics&mine=true`,
      { headers: this.headers },
    );
    return res.json();
  }

  async getChannelAnalytics(channelId: string) {
    const res = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel%3D%3D${channelId}&metrics=views%2Clikes%2CsubscribersGained%2CestimatedMinutesWatched&startDate=30daysAgo&endDate=today`,
      { headers: this.headers },
    );
    return res.json();
  }

  async uploadVideo(metadata: {
    snippet: { title: string; description: string };
    status: { privacyStatus: string };
  }) {
    const res = await fetch(
      "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status",
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(metadata),
      },
    );
    return res.json();
  }
}
