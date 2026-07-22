"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4">
        We could not load the meetings right now.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>

      <Link
        href="/meetings"
        className="block mt-4 text-blue-600 underline"
      >
        Back to meetings
      </Link>
    </main>
  );
}