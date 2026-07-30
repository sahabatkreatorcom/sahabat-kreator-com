"use client";

import { PostForm } from "../../../features/publishing/presentation/post-form";
import { PostList } from "../../../features/publishing/presentation/post-list";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Posting</h1>
        <p className="text-sm text-gray-500">
          Buat, jadwalkan, dan kelola posting
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <PostForm />
        </div>
        <div className="lg:col-span-2">
          <PostList />
        </div>
      </div>
    </div>
  );
}
