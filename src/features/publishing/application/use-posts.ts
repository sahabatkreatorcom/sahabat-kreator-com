"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../../core/entities/post";

interface CreatePostInput {
  accountId: string;
  content: string;
  mediaUrls: string[];
  scheduledAt?: string;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Gagal memuat post");
  return res.json();
}

async function createPost(data: CreatePostInput): Promise<Post> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Gagal membuat post");
  }
  return res.json();
}

async function deletePost(postId: string): Promise<void> {
  const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus post");
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

async function publishPost(postId: string): Promise<Post> {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "publish" }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Gagal publikasi");
  }
  return res.json();
}

export function usePublishPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
