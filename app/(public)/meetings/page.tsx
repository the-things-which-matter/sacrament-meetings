import MeetingCard from "@/components/MeetingCard";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";
import Link from "next/link";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query ?? "";
  const currentPage = Number(params.page) || 1;

  const meetings = await getMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  const createPageLink = (page: number) => {
    const search = query
      ? `?query=${query}&page=${page}`
      : `?page=${page}`;

    return `/meetings${search}`;
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">
        Sacrament Meetings
      </h1>

      <form className="mb-6">
        <input
          name="query"
          defaultValue={query}
          placeholder="Search meetings..."
          className="border rounded px-4 py-2 w-full max-w-md"
        />

        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      <div className="grid gap-6">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))
        ) : (
          <p className="text-gray-600">
            No meetings found matching your search.
          </p>
        )}
      </div>

      {totalPages > 0 && (
        <div className="flex gap-4 mt-8">
          {currentPage > 1 && (
            <Link
              href={createPageLink(currentPage - 1)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Previous
            </Link>
          )}

          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={createPageLink(currentPage + 1)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </main>
  );
}