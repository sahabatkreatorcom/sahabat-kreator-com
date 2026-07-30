import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { uploadToR2 } from "../../../lib/r2";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "proof";

  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop() ?? "jpg";
  const prefix = type === "post" ? "media" : "proof";
  const fileName = `${prefix}/${session.user.id}/${Date.now()}.${ext}`;

  const r2Url = await uploadToR2(buffer, fileName, file.type);
  if (r2Url) {
    return NextResponse.json({ url: r2Url });
  }

  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const localName = `${prefix}-${session.user.id}-${Date.now()}.${ext}`;
  await fs.writeFile(path.join(uploadDir, localName), buffer);

  return NextResponse.json({ url: `/uploads/${localName}` });
}
