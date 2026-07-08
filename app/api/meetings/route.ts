import { NextRequest } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  const meetings = getMeetings();

  if (date) {
    const filtered = meetings.filter(
      (meeting) => meeting.date === date
    );

    return Response.json(filtered);
  }

  return Response.json(meetings);
}