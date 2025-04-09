import { journalingPages } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createJournal, listJournals } from "./crud";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let page, pageSize;

  try {
    page = parseInt(searchParams.get("page") || "0");
    pageSize = parseInt(searchParams.get("pageSize") || "10");
  } catch (err: unknown) {
    console.error("Error parsing search params:", (err as Error).message);
    return new Response("Invalid search params", { status: 400 });
  }

  const authorId = 1; // Replace with actual author ID from session or request context when its ready
  const result = await listJournals(authorId, page, pageSize);
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedData = createInsertSchema(journalingPages, {
    author_id: z.number().optional(), // Optional because we will set it in the backend
  }).safeParse(body); // Will parse successfully

  if (!parsedData.success) {
    console.error("Failed to parse data:", parsedData);

    return NextResponse.json(
      { error: "Invalid data", details: parsedData.error },
      { status: 400 },
    );
  }

  const authorId = 1; // Replace with actual author ID from session or request context when its ready
  const result = await createJournal({
    ...parsedData.data,
    author_id: authorId,
  });
  return NextResponse.json({ id: result }, { status: 201 });
}
