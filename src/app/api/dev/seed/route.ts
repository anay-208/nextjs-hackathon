import { seedDatabase } from "@/db/seed";

export async function GET() {
  // This is a dev only route
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ res: "not allowed" }, { status: 403 });
  }
  try {
    const seededData = await seedDatabase();
    return Response.json({ res: "ok", data: seededData }, { status: 200 });
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ res: "error" }, { status: 500 });
  }
}
