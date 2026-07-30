import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import { getDb } from "../../../../lib/db";
import { socialAccount } from "../../../../lib/db/schema";
import { eq, count } from "drizzle-orm";
import { PLANS } from "../../../../config/plans";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getDb().query.user.findFirst({
    where: (u, { eq }) => eq(u.id, session.user.id),
  });

  const planId = (user?.planId ?? "free") as keyof typeof PLANS;
  const plan = PLANS[planId] ?? PLANS.free;

  const accountCount = await getDb()
    .select({ count: count() })
    .from(socialAccount)
    .where(eq(socialAccount.userId, session.user.id));

  const currentAccounts = accountCount[0]?.count ?? 0;

  return NextResponse.json({
    planId,
    currentAccounts,
    maxAccounts: plan.maxAccounts === -1 ? Infinity : plan.maxAccounts,
    usagePercent:
      plan.maxAccounts === -1
        ? 0
        : Math.round((currentAccounts / plan.maxAccounts) * 100),
  });
}
