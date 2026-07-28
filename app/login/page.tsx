import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">
          Bishopric Sign In
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}