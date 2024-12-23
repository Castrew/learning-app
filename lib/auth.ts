import NextAuth from "next-auth";
import type { NextAuthConfig, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db/db";

declare module "next-auth" {
  interface Session {
    user: {
      image?: string;
      id?: string;
      name?: string;
      email?: string;
    };
  }
}

export const authConfig = {
  debug: false,
  pages: {
    signIn: "/", // Redirect users to "/login" when signing in
  },
  // added secret key
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      // Configure Google authentication provider with environment variables
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    session(params) {
      if ("user" in params) {
        const session: Session = params.session;
        const user: User = params?.user;

        if (session.user !== undefined) {
          session.user.id = user.id;
        }
        return session;
      }
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
