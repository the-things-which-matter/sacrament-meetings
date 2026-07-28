import { SignOutButton } from "@/components/sign-out-button";

export default function AdminMeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-end p-4">
        <SignOutButton />
      </header>

      {children}
    </>
  );
}