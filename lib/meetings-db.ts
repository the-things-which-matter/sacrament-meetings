import { neon } from "@neondatabase/serverless";
import { SacramentMeeting } from "./types";

const sql = neon(`${process.env.DATABASE_URL}`);

function mapMeeting(row: any): SacramentMeeting {
  return {
    id: row.id,
    date:
    row.date instanceof Date
    ? row.date.toISOString().split("T")[0]
    : row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
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

// Week 04 placeholders
export async function addMeeting(
  meeting: SacramentMeeting
): Promise<void> {
  throw new Error("Not implemented yet");
}

export async function updateMeeting(
  id: number,
  meeting: SacramentMeeting
): Promise<void> {
  throw new Error("Not implemented yet");
}

export async function deleteMeeting(
  id: number
): Promise<void> {
  throw new Error("Not implemented yet");
}