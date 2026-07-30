import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/db";
import { user } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (session.user.email !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await getDb()
    .update(user)
    .set({ role: "admin" })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ success: true, role: "admin" });
}
