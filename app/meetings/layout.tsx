import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <nav className="mb-6 flex gap-4 border-b pb-3">
        <Link
          href="/meetings"
          className="text-blue-600 hover:underline"
        >
          All Meetings
        </Link>

        <Link
          href="/meetings/current"
          className="text-blue-600 hover:underline"
        >
          Current Sunday
        </Link>
      </nav>

      {children}
    </section>
  );
}