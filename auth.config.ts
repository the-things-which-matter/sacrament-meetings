import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("AUTH CHECK:", nextUrl.pathname);

      const isLoggedIn = !!auth?.user;

      // Protecting bishopric/admin meeting management routes only
      const isProtected =
        nextUrl.pathname.startsWith("/meetings/new") ||
        nextUrl.pathname.includes("/edit");

      if (isProtected) {
        if (isLoggedIn) return true;

        return false; // Redirect unauthenticated users to /login
      }

      // Redirect logged-in users away from login page
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;