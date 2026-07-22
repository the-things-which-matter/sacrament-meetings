import { neon } from "@neondatabase/serverless";
import {
  SacramentMeeting,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
  MeetingType,
} from "./types";

const sql = neon(`${process.env.DATABASE_URL}`);

function formatDate(date: Date | string): string {
  if (date instanceof Date) {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  return date;
}

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: row.id as number,

    date: formatDate(row.date as Date | string),

    meetingType: row.meeting_type as MeetingType,

    presiding: row.presiding as string,

    conducting: row.conducting as string,

    announcements:
      (row.announcements as string[] | null) ?? [],

    openingHymn:
      (row.opening_hymn as Hymn) ?? {
        number: 0,
        title: "",
      },

    openingPrayer:
      (row.opening_prayer as string) ?? "",

    wardBusiness:
      (row.ward_business as WardBusinessItem[] | null) ?? [],

    stakeBusiness:
      (row.stake_business as boolean) ?? false,

    sacramentHymn:
      (row.sacrament_hymn as Hymn) ?? {
        number: 0,
        title: "",
      },

    speakers:
      (row.speakers as SpeakerItem[] | null) ?? [],

    closingHymn:
      (row.closing_hymn as Hymn) ?? {
        number: 0,
        title: "",
      },

    closingPrayer:
      (row.closing_prayer as string) ?? "",
  };
}

export async function getMeetings(
  query = "",
  page = 1
): Promise<SacramentMeeting[]> {
  const offset = (page - 1) * 5;

  const rows = query
    ? await sql`
        SELECT *
        FROM meetings
        WHERE
          presiding ILIKE ${`%${query}%`}
          OR conducting ILIKE ${`%${query}%`}
          OR CAST(meeting_type AS TEXT) ILIKE ${`%${query}%`}
          OR speakers::text ILIKE ${`%${query}%`}
        ORDER BY date
        LIMIT 5
        OFFSET ${offset}
      `
    : await sql`
        SELECT *
        FROM meetings
        ORDER BY date
        LIMIT 5
        OFFSET ${offset}
      `;

  return rows.map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query = ""
): Promise<number> {
  const result = query
    ? await sql`
        SELECT COUNT(*)
        FROM meetings
        WHERE
          presiding ILIKE ${`%${query}%`}
          OR conducting ILIKE ${`%${query}%`}
          OR CAST(meeting_type AS TEXT) ILIKE ${`%${query}%`}
          OR speakers::text ILIKE ${`%${query}%`}
      `
    : await sql`
        SELECT COUNT(*)
        FROM meetings
      `;

  return Math.ceil(Number(result[0].count) / 5);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const result = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
  `;

  if (result.length === 0) {
    return undefined;
  }

  return mapMeeting(result[0]);
}


export async function addMeeting(
  meeting: SacramentMeeting
): Promise<void> {
  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)},
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)},
      ${JSON.stringify(meeting.speakers)},
      ${JSON.stringify(meeting.closingHymn)},
      ${meeting.closingPrayer}
    )
  `;
}


export async function updateMeeting(
  id: number,
  meeting: SacramentMeeting
): Promise<void> {
  await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)},
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)},
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)},
      speakers = ${JSON.stringify(meeting.speakers)},
      closing_hymn = ${JSON.stringify(meeting.closingHymn)},
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(
  id: number
): Promise<void> {
  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}