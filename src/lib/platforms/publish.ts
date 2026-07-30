import type { socialAccount } from "../db/schema";

type SocialAccount = typeof socialAccount.$inferSelect;

export async function publishToFacebook(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const pageId = account.accountId;
  const token = account.accessToken;
  const apiVersion = "v25.0";

  const body: Record<string, string> = { message: content, access_token: token };
  if (mediaUrls && mediaUrls.length > 0) {
    body.attached_media = mediaUrls.map((url) => `{"media_fbid":"${url}"}`).join(",");
  }

  const res = await fetch(
    `https://graph.facebook.com/${apiVersion}/${pageId}/feed`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Facebook publish failed");
  return { platformPostId: data.id };
}

export async function publishToInstagram(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const igUserId = account.platformMetadata
    ? JSON.parse(account.platformMetadata).igUserId ?? account.accountId
    : account.accountId;
  const token = account.accessToken;
  const apiVersion = "v25.0";

  if (mediaUrls && mediaUrls.length > 0) {
    const mediaIds: string[] = [];
    for (const url of mediaUrls) {
      const createRes = await fetch(
        `https://graph.facebook.com/${apiVersion}/${igUserId}/media`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image_url: url, caption: content, access_token: token }) },
      );
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error?.message ?? "Instagram media creation failed");
      mediaIds.push(createData.id);
    }
    const publishRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${igUserId}/media_publish`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ media_id: mediaIds[0], access_token: token }) },
    );
    const publishData = await publishRes.json();
    if (!publishRes.ok) throw new Error(publishData.error?.message ?? "Instagram publish failed");
    return { platformPostId: publishData.id };
  }

  const res = await fetch(
    `https://graph.facebook.com/${apiVersion}/${igUserId}/media`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ caption: content, access_token: token, media_type: "CAROUSEL" }) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Instagram publish failed");
  const publishRes = await fetch(
    `https://graph.facebook.com/${apiVersion}/${igUserId}/media_publish`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ media_id: data.id, access_token: token }) },
  );
  const publishData = await publishRes.json();
  if (!publishRes.ok) throw new Error(publishData.error?.message ?? "Instagram publish failed");
  return { platformPostId: publishData.id };
}

export async function publishToInstagramDirect(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const igUserId = account.accountId;
  const token = account.accessToken;

  if (mediaUrls && mediaUrls.length > 0) {
    const createRes = await fetch(
      `https://graph.instagram.com/v21.0/${igUserId}/media`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image_url: mediaUrls[0], caption: content, access_token: token }) },
    );
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(createData.error?.message ?? "Instagram Direct media creation failed");
    const publishRes = await fetch(
      `https://graph.instagram.com/v21.0/${igUserId}/media_publish`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ media_id: createData.id, access_token: token }) },
    );
    const publishData = await publishRes.json();
    if (!publishRes.ok) throw new Error(publishData.error?.message ?? "Instagram Direct publish failed");
    return { platformPostId: publishData.id };
  }

  const res = await fetch(
    `https://graph.instagram.com/v21.0/${igUserId}/media`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ media_type: "CAROUSEL", caption: content, access_token: token }) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Instagram Direct publish failed");
  return { platformPostId: data.id };
}

export async function publishToThreads(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const token = account.accessToken;
  const userId = account.accountId;
  const apiVersion = "v25.0";

  const body: Record<string, string> = { text: content, access_token: token };
  if (mediaUrls && mediaUrls.length > 0) {
    const mediaRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${userId}/threads_media`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image_url: mediaUrls[0], access_token: token }) },
    );
    const mediaData = await mediaRes.json();
    if (!mediaRes.ok) throw new Error(mediaData.error?.message ?? "Threads media creation failed");
    body.media_id = mediaData.id;
  }

  const res = await fetch(
    `https://graph.facebook.com/${apiVersion}/${userId}/threads`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Threads publish failed");
  return { platformPostId: data.id };
}

export async function publishToLinkedIn(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const token = account.accessToken;
  const personId = account.accountId;

  const body: Record<string, unknown> = {
    author: `urn:li:person:${personId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: content },
        shareMediaCategory: mediaUrls?.length ? "IMAGE" : "NONE",
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };

  if (mediaUrls?.length) {
    const shareContent = (body.specificContent as Record<string, unknown>)["com.linkedin.ugc.ShareContent"] as Record<string, unknown>;
    shareContent.media = mediaUrls.map((url) => ({
      status: "READY",
      description: { text: "" },
      media: url,
      title: { text: "" },
    }));
  }

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "LinkedIn publish failed");
  return { platformPostId: data.id };
}

export async function publishToYouTube(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const token = account.accessToken;
  const channelId = account.accountId;

  if (!mediaUrls?.length) {
    const res = await fetch("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        snippet: { channelId, videoId: "", topLevelComment: { snippet: { textOriginal: content } } },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message ?? "YouTube publish failed");
    return { platformPostId: data.id };
  }

  const body = new FormData();
  const metadata = {
    snippet: { title: content.slice(0, 100), description: content, channelId },
    status: { privacyStatus: "public" },
  };
  body.append("part", "snippet,status");
  body.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));

  for (const url of mediaUrls) {
    const mediaRes = await fetch(url);
    const blob = await mediaRes.blob();
    body.append("media", blob, "video.mp4");
  }

  const res = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "YouTube upload failed");
  return { platformPostId: data.id };
}

export async function publishToTikTok(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const token = account.accessToken;

  if (!mediaUrls?.length) throw new Error("TikTok requires a video");

  const videoRes = await fetch(mediaUrls[0]);
  const videoBlob = await videoRes.blob();

  const initRes = await fetch("https://open-api.tiktok.com/share/video/upload/init/", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ source_info: { source: "FILE_UPLOAD" }, post_info: { privacy_level: "PUBLIC", title: content } }),
  });
  const initData = await initRes.json();
  if (!initRes.ok) throw new Error(initData.error?.message ?? "TikTok init failed");

  const uploadUrl = initData.data?.upload_url;
  if (!uploadUrl) throw new Error("No upload URL from TikTok");

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": videoBlob.size.toString() },
    body: videoBlob,
  });
  if (!uploadRes.ok) throw new Error("TikTok video upload failed");

  return { platformPostId: initData.data?.publish_id ?? uploadUrl };
}

export async function publishToPinterest(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) {
  const token = account.accessToken;
  const boardId = account.platformMetadata
    ? JSON.parse(account.platformMetadata).boardId ?? account.accountId
    : account.accountId;

  if (!mediaUrls?.length) throw new Error("Pinterest requires an image");

  const res = await fetch("https://api.pinterest.com/v5/pins", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      board_id: boardId,
      title: content.slice(0, 100),
      description: content,
      media_source: { source_type: "image_url", url: mediaUrls[0] },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Pinterest publish failed");
  return { platformPostId: data.id };
}

type Publisher = (
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
) => Promise<{ platformPostId: string }>;

const publishers: Record<string, Publisher> = {
  facebook: publishToFacebook,
  instagram: publishToInstagram,
  instagram_direct: publishToInstagramDirect,
  threads: publishToThreads,
  linkedin: publishToLinkedIn,
  youtube: publishToYouTube,
  tiktok: publishToTikTok,
  pinterest: publishToPinterest,
};

export async function publishToPlatform(
  account: SocialAccount,
  content: string,
  mediaUrls?: string[],
): Promise<{ platformPostId: string }> {
  const publisher = publishers[account.platform];
  if (!publisher) throw new Error(`Unknown platform: ${account.platform}`);
  return publisher(account, content, mediaUrls);
}
