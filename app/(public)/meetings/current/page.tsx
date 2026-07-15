import { getMeetings } from "@/lib/meetings-db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();

  const currentMeeting = meetings[meetings.length - 1];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}