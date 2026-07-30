const LINKEDIN_API_URL = "https://api.linkedin.com/v2";

export class LinkedInClient {
  constructor(private accessToken: string) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  async getProfile() {
    const res = await fetch(`${LINKEDIN_API_URL}/me`, {
      headers: this.headers,
    });
    return res.json();
  }

  async getOrganizations() {
    const res = await fetch(
      `${LINKEDIN_API_URL}/organizationalEntityAcls?q=roleAssignee&role=ADMINISTRATOR`,
      { headers: this.headers },
    );
    return res.json();
  }

  async createPost(author: string, text: string) {
    const res = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        author,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text },
            shareMediaCategory: "NONE",
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      }),
    });
    return res.json();
  }
}
