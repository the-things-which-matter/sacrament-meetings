import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center">
        <Image
          src="/next.svg"
          alt="Sacrament Meeting Planner"
          width={180}
          height={40}
          className="mx-auto mb-8"
          priority
        />

        <h1 className="text-4xl font-bold mb-4">
          Sacrament Meeting Planner
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Plan, organize, and review sacrament meeting programs with an
          easy-to-use Next.js application.
        </p>

        <Link
          href="/meetings"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          View Meetings
        </Link>
      </section>
    </main>
  );
}