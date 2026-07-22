import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";
import { deleteMeetingAction } from "@/lib/actions";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const deleteAction =
    deleteMeetingAction.bind(null, meeting.id);

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

      <div className="flex gap-4 mt-4">

        <Link
          href={`/meetings/${meeting.id}`}
          className="text-blue-600 hover:underline"
        >
          View Meeting Program
        </Link>


        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-green-600 hover:underline"
        >
          Edit
        </Link>


        <form action={deleteAction}>
          <button
            type="submit"
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </form>

      </div>
    </article>
  );
}