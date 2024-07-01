"use server";

import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { userTable } from "../../../../../db/schema";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { lucia } from "../../../../../lib/auth";
import { cookies } from "next/headers";
import { db } from "../../../../../db/db";

const successResponseOneObject = (data: {}) => {
  return Response.json(
    { apiVersion: "1.0", code: 200, message: "Success", data },
    { status: 200 }
  );
};

const serverError = (error: any) => {
  return Response.json(
    {
      apiVersion: "1.0",
      message: "Internal Server Error",
      code: "500",
      reason: { error },
    },
    { status: 500 }
  );
};

export const POST = async (request: NextRequest) => {
  const { username, password } = await request.json();

  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.username, username),
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isValidPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      password
    );

    if (!isValidPassword) {
      return Response.json(
        { error: "Incorrect username or password" },
        { status: 401 }
      );
    }

    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    const response = {
      id: existingUser.id,
      username: existingUser.username,
    };

    const test = cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return successResponseOneObject(response);
  } catch (error) {
    return serverError(error);
  }
};
