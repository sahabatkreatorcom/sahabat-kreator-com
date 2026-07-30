import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { getDb } from "../../../../../lib/db";
import { payment, user } from "../../../../../lib/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const result = await getDb()
    .update(payment)
    .set({
      proofImageUrl: body.proofImageUrl,
      status: "pending",
      updatedAt: new Date().toISOString(),
    })
    .where(and(eq(payment.id, id), eq(payment.userId, session.user.id)))
    .returning();

  return NextResponse.json(result[0]);
}
