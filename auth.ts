import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Temporary demo user
        const user = {
          email: "bishop@example.com",
          passwordHash: await bcrypt.hash("password123", 10),
          name: "Bishop",
        };

        if (email !== user.email) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (passwordsMatch) {
          return {
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});