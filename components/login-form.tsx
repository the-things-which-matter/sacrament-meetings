"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          name="email"
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        aria-disabled={isPending}
        className="border px-4 py-2"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {errorMessage && (
        <p role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}