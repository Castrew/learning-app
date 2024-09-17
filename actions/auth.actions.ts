"use server";

import { userTable } from "../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "../lib/auth";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { db } from "../db/db";

interface SignUpFormProps {
  username: string;
  password: string;
  confirmPassword: string;
}
interface SignInFormProps {
  username: string;
  password: string;
}

type SuccessResponse = {
  status: 200;
  id: string;
  username: string;
};

type ErrorResponse = {
  status: 404;
  error: string;
};

export const signUp = async (data: SignUpFormProps) => {
  const { username, password, confirmPassword } = data;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (existingUser[0]) {
      const response: ErrorResponse = {
        error: "Username already exists",
        status: 404,
      };
      return response;
    }

    await db.insert(userTable).values({ id: userId, username, hashedPassword });

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value + `?userId=${userId}`,
      sessionCookie.attributes
    );

    const createdUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    const response: SuccessResponse = {
      status: 200,
      id: createdUser[0].id,
      username: createdUser[0].username,
    };

    return response;
  } catch (error) {
    return { error: error, status: 500 };
  }
};

export const signIn = async (data: SignInFormProps) => {
  const { username, password } = data;

  try {
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (!existingUser || !existingUser[0].hashedPassword) {
      const response: ErrorResponse = {
        error: "Incorrect username or password",
        status: 404,
      };
      return response;
    }

    const isValidPassword = await new Argon2id().verify(
      existingUser[0].hashedPassword,
      password
    );

    if (!isValidPassword) {
      const response: ErrorResponse = {
        error: "Incorrect username or password",
        status: 404,
      };
      return response;
    }

    const session = await lucia.createSession(existingUser[0].id, {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    const response: SuccessResponse = {
      status: 200,
      id: existingUser[0].id,
      username: existingUser[0].username,
    };

    cookies().set(
      sessionCookie.name,
      sessionCookie.value + `?userId=${existingUser[0].id}`,
      sessionCookie.attributes
    );

    return response;
  } catch (error) {
    return { error: error, status: 500 };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return { error: "Unauthorized", status: 401 };
    }
    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return { error: error?.message, status: 500 };
  }
};
