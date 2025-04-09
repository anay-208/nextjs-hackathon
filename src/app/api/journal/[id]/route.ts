import { db } from "@/db";
import { journalingPages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deleteJournal, getJournal } from "../crud";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;

  if (isNaN(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const result = await getJournal(id);
  return NextResponse.json(result, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const body = await request.json();

  const parsedData = createUpdateSchema(journalingPages, {
    author_id: z.undefined(), // You cant change the author
  }).safeParse(body); // Will parse successfully (hopefully)

  if (!parsedData.success) {
    console.error("Failed to parse data:", parsedData);

    return NextResponse.json(
      { error: "Invalid data", details: parsedData.error },
      { status: 400 },
    );
  }

  const result = await db
    .update(journalingPages)
    .set(parsedData.data)
    .where(eq(journalingPages.id, id))
    .then(() => true)
    .catch(() => false);

  if (!result) {
    return new Response("Failed to update journal entry", { status: 500 });
  }

  return new Response("Journal entry updated", { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;

  if (isNaN(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const result = await deleteJournal(id);
  if (!result) {
    return new Response("Failed to delete journal entry", { status: 500 });
  }

  return new Response("Journal entry deleted", { status: 200 });
}
