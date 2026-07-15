import { neon } from "@neondatabase/serverless";
import {
  SacramentMeeting,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
  MeetingType,
} from "./types";

const sql = neon(`${process.env.DATABASE_URL}`);

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: row.id as number,

    date:
      row.date instanceof Date
        ? row.date.toISOString().split("T")[0]
        : (row.date as string),

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

// Create meeting
export async function addMeeting(
  meeting: SacramentMeeting
): Promise<void> {
  throw new Error("Not implemented yet");
}

// Update meeting
export async function updateMeeting(
  id: number,
  meeting: SacramentMeeting
): Promise<void> {
  throw new Error("Not implemented yet");
}

// Delete meeting
export async function deleteMeeting(
  id: number
): Promise<void> {
  throw new Error("Not implemented yet");
}