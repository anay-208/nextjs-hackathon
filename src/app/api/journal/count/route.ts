import { NextResponse } from "next/server";
import { getJournalCount } from "../crud";

export async function GET() {
  const author_id = 1; // Replace with actual author ID from session or request context when its ready
  const result = await getJournalCount(author_id);
  return NextResponse.json(result, { status: 200 });
}
