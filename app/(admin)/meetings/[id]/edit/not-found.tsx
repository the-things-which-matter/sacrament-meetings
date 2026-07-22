import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        Meeting not found
      </h1>

      <p className="mt-4">
        The meeting you are looking for does not exist.
      </p>

      <Link
        href="/meetings"
        className="text-blue-600 underline mt-4 inline-block"
      >
        Return to meetings
      </Link>
    </main>
  );
}