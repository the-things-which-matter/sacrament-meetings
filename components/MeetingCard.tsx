import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="border rounded-lg p-5 shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">
        {meeting.meetingType.toUpperCase()} Meeting
      </h2>

      <p className="text-gray-700">
        Date: {meeting.date}
      </p>

      <p className="text-gray-700">
        Presiding: {meeting.presiding}
      </p>

      <p className="text-gray-700">
        Conducting: {meeting.conducting}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        View Meeting Program
      </Link>
    </article>
  );
}