const PINTEREST_API_URL = "https://api.pinterest.com/v5";

export class PinterestClient {
  constructor(private accessToken: string) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async getUserAccount() {
    const res = await fetch(`${PINTEREST_API_URL}/user_account`, {
      headers: this.headers,
    });
    return res.json();
  }

  async getBoards() {
    const res = await fetch(`${PINTEREST_API_URL}/boards`, {
      headers: this.headers,
    });
    return res.json();
  }

  async createPin(
    boardId: string,
    title: string,
    description: string,
    link: string,
    mediaUrl: string,
  ) {
    const res = await fetch(`${PINTEREST_API_URL}/pins`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        board_id: boardId,
        title,
        description,
        link,
        media_source: {
          source_type: "image_url",
          url: mediaUrl,
        },
      }),
    });
    return res.json();
  }

  async getPinAnalytics(pinId: string) {
    const res = await fetch(
      `${PINTEREST_API_URL}/pins/${pinId}/analytics?metrics=impression,save,click,outbound_click`,
      { headers: this.headers },
    );
    return res.json();
  }
}
