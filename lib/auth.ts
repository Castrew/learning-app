import { Lucia } from "lucia";
import adapter from "./adapter";
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true,
      // secure: process.env.NODE_ENV === "production",
      // maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
});

export const validateRequest = cache(async () => {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    console.log(sessionId, "sessionId");

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    const { user, session } = await lucia.validateSession(sessionId);
    console.log(user, "user", "session", session);

    return { user, session };
  } catch (error) {
    console.error("Error validating session:", error);
    return {
      user: null,
      session: null,
    };
  }
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
