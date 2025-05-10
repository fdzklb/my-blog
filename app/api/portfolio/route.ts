import { db } from "@/db";
export async function GET() {
  try {
    const data = await db.portfolio.findMany({
      take: 10,
      select: { title: true,  slug: true, description: true },
      orderBy: [{ view_count: "desc" }],
    });
    return Response.json(data);
  } catch (error) {
    console.error("Database Error...", error);
    throw new Error("Failed to fetch the portfolio");
  }
}

export async function POST(request: Request) {
  const { slug, title, description, date } = await request.json();
  
  try {
    const existingPost = await db.portfolio.findUnique({
      where: { slug },
    });
    if (existingPost) {
      await db.portfolio.update({
        where: { slug },
        data: {
          view_count: { increment: 1 },
        },
      });
    } else {
      await db.portfolio.create({
        data: {
          slug,
          title,
          description,
          date,
          categories: ''
        },
      });
    }
  } catch (error) {
    console.error("Error updating page view", error);
    return new Response("Failed to portfolio to DB", { status: 500 });
  }

  return new Response("Successfully posted portfolio to DB", { status: 200 });
}
