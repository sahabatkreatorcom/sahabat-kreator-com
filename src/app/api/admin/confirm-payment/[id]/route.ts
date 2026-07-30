import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { getDb } from "../../../../../lib/db";
import { payment, user } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const pay = await getDb()
    .select()
    .from(payment)
    .where(eq(payment.id, id))
    .then((r) => r[0]);

  if (!pay) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  await getDb()
    .update(payment)
    .set({
      status: "confirmed",
      confirmedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(payment.id, id));

  await getDb()
    .update(user)
    .set({ planId: pay.planId })
    .where(eq(user.id, pay.userId));

  return NextResponse.json({ success: true });
}
