"use client";

import { usePosts, useDeletePost, usePublishPost } from "../application/use-posts";
import { formatDate } from "../../../shared/lib/utils";
import { PLATFORM_CONFIG } from "../../../config/platforms";
import type { Platform } from "../../../core/value-objects/platform";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";

const STATUS_LABEL: Record<string, string> = {
  draft: "Draf",
  scheduled: "Terjadwal",
  published: "Terpublikasi",
  failed: "Gagal",
};

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

export function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  const deletePost = useDeletePost();
  const publishPost = usePublishPost();

  if (isLoading)
    return <div className="text-sm text-gray-500">Memuat post...</div>;
  if (error)
    return (
      <div className="text-sm text-red-500">Gagal memuat: {error.message}</div>
    );

  if (!posts?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Post</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Belum ada post. Buat post pertama kamu!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      {PLATFORM_CONFIG[post.platform as Platform]?.label ?? post.platform}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${STATUS_COLOR[post.status] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {STATUS_LABEL[post.status] ?? post.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{post.content}</p>
                  {post.scheduledAt && (
                    <p className="mt-1 text-xs text-gray-500">
                      Terjadwal: {formatDate(post.scheduledAt)}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="mt-1 text-xs text-gray-500">
                      Dipublikasi: {formatDate(post.publishedAt)}
                    </p>
                  )}
                  {post.errorMessage && (
                    <p className="mt-1 text-xs text-red-500">
                      Error: {post.errorMessage}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(post.status === "draft" || post.status === "failed") && (
                    <button
                      onClick={() => publishPost.mutate(post.id)}
                      disabled={publishPost.isPending}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Publikasi
                    </button>
                  )}
                  <button
                    onClick={() => deletePost.mutate(post.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
