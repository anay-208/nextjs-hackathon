import { seedDatabase } from "@/db/seed";

export async function GET() {
  // This is a dev only route
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ res: "not allowed" })
  }
  try {
    await seedDatabase();
    return Response.json({ res: "ok" })
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({ res: "error" })
  }
}