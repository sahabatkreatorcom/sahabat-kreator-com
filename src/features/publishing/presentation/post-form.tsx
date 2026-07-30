"use client";

import { useState, useRef } from "react";
import { useCreatePost } from "../application/use-posts";
import { useSocialAccounts } from "../../social-accounts/application/use-social-accounts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";

export function PostForm() {
  const { data: accounts } = useSocialAccounts();
  const createPost = useCreatePost();

  const [accountId, setAccountId] = useState("");
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected]);
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setMediaUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accountId || !content) return;

    let urls = mediaUrls;
    if (files.length > urls.length) {
      setUploading(true);
      const newUrls: string[] = [];
      for (const file of files.slice(urls.length)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload?type=post", { method: "POST", body: fd });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        }
      }
      urls = [...urls, ...newUrls];
      setMediaUrls(urls);
      setUploading(false);
    }

    await createPost.mutateAsync({
      accountId,
      content,
      mediaUrls: urls,
      scheduledAt: scheduledAt || undefined,
    });

    setContent("");
    setScheduledAt("");
    setFiles([]);
    setMediaUrls([]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Post Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Akun</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              required
            >
              <option value="">Pilih akun...</option>
              {accounts?.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountName} ({acc.platform})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Konten</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Tulis konten post..."
              required
            />
            <span className="text-xs text-gray-500">
              {content.length} karakter
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium">Media</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
            />
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg border">
                    {f.type.startsWith("video/") ? (
                      <video src={URL.createObjectURL(f)} className="h-full w-full object-cover" />
                    ) : (
                      <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-bl bg-red-500 text-xs text-white"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Jadwalkan (opsional)
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={createPost.isPending || uploading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading
              ? "Mengupload media..."
              : createPost.isPending
                ? "Mempublikasikan..."
                : scheduledAt
                  ? "Jadwalkan"
                  : "Publikasi"}
          </button>

          {createPost.error && (
            <p className="text-sm text-red-600">{createPost.error.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
