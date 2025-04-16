import { db } from "@/db";

export async function POST(request: Request) {
  // 从request中提取ip地址
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr") || "unknown";

  const datas = await request.json();
  const { trackId, records } = datas;

  try {
    const existingTrack = await db.visitor.findUnique({
      where: { trackId },
    });

    if (existingTrack) {
      await db.visitor.update({
        where: { trackId },
        data: {
          records: records
        },
      });
    } else {
      await db.visitor.create({
        data: {
          trackId,
          date: new Date().toISOString(),
          ip,
          records: records,
        },
      });
    }
  } catch (error) {
    console.error("Error updating visitor table", error);
    return new Response("Failed to post to visitor table", { status: 500 });
  }

  return new Response("Successfully posted to visitor table", { status: 200 });
}
