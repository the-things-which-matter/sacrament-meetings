import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const meetings = getMeetings();

  const currentMeeting = meetings[meetings.length - 1];

  redirect(`/meetings/${currentMeeting.id}`);
}