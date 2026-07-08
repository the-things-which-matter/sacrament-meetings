import NavLinks from "./NavLinks";

export default function Header() {
  const today = new Date().toLocaleDateString();

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Sacrament Meeting Planner
        </h1>

        <p className="text-sm">
          Ward Program • {today}
        </p>

        <NavLinks />
      </div>
    </header>
  );
}