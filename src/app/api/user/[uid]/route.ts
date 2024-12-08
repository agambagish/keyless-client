import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { users } from "~/db/schema";

export const GET = async (
  _: NextRequest,
  { params }: { params: { uid: string } },
) => {
  const user = await db.query.users.findFirst({
    where: eq(users.uid, params.uid),
    columns: { name: true },
  });

  if (!user) {
    return NextResponse.json({ type: "user:invalid" });
  }

  return NextResponse.json({ type: "lock:open", name: user.name });
};
