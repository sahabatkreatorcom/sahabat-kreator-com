import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { getDb } from "../../../lib/db";
import { payment } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await getDb()
    .select()
    .from(payment)
    .where(eq(payment.userId, session.user.id))
    .orderBy(payment.createdAt);

  return NextResponse.json(payments);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { planId, amount, method } = body;

  const result = await getDb()
    .insert(payment)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      planId,
      amount,
      method: method ?? "qris",
      status: "pending",
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .returning();

  return NextResponse.json(result[0], { status: 201 });
}
