"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "font-bold underline"
      : "hover:underline";

  return (
    <nav>
      <ul className="flex gap-6 mt-2">
        <li>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/meetings" className={linkClass("/meetings")}>
            Meetings
          </Link>
        </li>
      </ul>
    </nav>
  );
}