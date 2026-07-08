import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">
        Sacrament Meeting Program
      </h1>

      <div className="space-y-2 mb-6">
        <p>
          <strong>Date:</strong> {meeting.date}
        </p>
        <p>
          <strong>Meeting Type:</strong> {meeting.meetingType}
        </p>
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>
        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </div>

      {meeting.announcements && (
        <div className="mb-6">
          <h2 className="text-xl font-bold">Announcements</h2>
          <ul className="list-disc ml-6">
            {meeting.announcements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <p>
          <strong>Opening Hymn:</strong>{" "}
          {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Opening Prayer:</strong> {meeting.openingPrayer}
        </p>

        <div>
          <h2 className="text-xl font-bold">
            Ward Business
          </h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc ml-6">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ward business</p>
          )}
        </div>

        <p>
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>

        <p>
          <strong>Sacrament Hymn:</strong>{" "}
          {meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>

        <div>
          <h2 className="text-xl font-bold">
            Speakers & Musical Numbers
          </h2>

          {meeting.speakers.map((speaker, index) => (
            <p key={index}>
              <strong>{speaker.type}:</strong>{" "}
              {speaker.name} - {speaker.topic}
            </p>
          ))}
        </div>

        <p>
          <strong>Closing Hymn:</strong>{" "}
          {meeting.closingHymn.number} - {meeting.closingHymn.title}
        </p>

        <p>
          <strong>Closing Prayer:</strong>{" "}
          {meeting.closingPrayer}
        </p>
      </div>
    </section>
  );
}