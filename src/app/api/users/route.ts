import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { userTable } from "../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import * as schema from "../../../../db/schema";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { v4 as uuidv4 } from "uuid";
import { lucia } from "../../../../lib/auth";
import { cookies } from "next/headers";

const dbServer = {
  host: "127.0.0.1",
  user: "root",
  database: "learning_app",
};

const successResponseOneObject = (data: {}) => {
  return Response.json(
    { apiVersion: "1.0", code: 200, message: "Success", data: data },
    { status: 200 }
  );
};

const successResponseList = (data: {}) => {
  return Response.json(
    {
      apiVersion: "1.0",
      code: 200,
      message: "Success",
      data: {
        object: "List",
        items: data,
      },
    },
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

const notFoundError = () => {
  return Response.json(
    {
      apiVersion: "1.0",
      error: {
        message: "Record Not Found",
        status: "404",
      },
    },
    { status: 404 }
  );
};

// export const GET = async (request: NextRequest) => {
//   try {
//     const connection = await mysql.createConnection({
//       ...dbServer,
//     });
//     const db = drizzle(connection);

//     const allUsers = await db.select().from(userTable);
//     return successResponseList(allUsers);
//   } catch (error) {
//     return serverError(error);
//   }
// };

export const GET = async (request: NextRequest) => {
  const { username, password } = await request.json();

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection, { schema: { userTable }, mode: "default" });

    // const existingUser = await db.query.userTable.findFirst({
    //   where: (table) => eq(table.username, username),
    // });

    return successResponseList({ as: "assa" });
  } catch (error) {
    return serverError(error);
  }
};

// export const POST = async (request: NextRequest) => {
//   const { username, password } = await request.json();
//   console.log(username, password);

//   const hashedPassword = await new Argon2id().hash(password);
//   const userId = generateId(15);
//   try {
//     const connection = await mysql.createConnection({
//       ...dbServer,
//     });
//     const db = drizzle(connection, { schema, mode: "default" });
//     const createUserDBResponse = await db
//       .insert(userTable)
//       .values({ id: userId, username, hashedPassword });

//     const createdUserId = createUserDBResponse[0].insertId;
//     const createdUser = await db
//       .select()
//       .from(userTable)
//       .where(eq(userTable.id, createdUserId));

//     return successResponseOneObject(createdUser[0]);
//   } catch (error) {
//     return serverError(error);
//   }
// };

export const POST = async (request: NextRequest) => {
  const { username, password } = await request.json();

  const hashedPassword = await new Argon2id().hash(password);
  const userId = uuidv4();

  try {
    const connection = await mysql.createConnection(dbServer);
    const db = drizzle(connection, { schema: { userTable }, mode: "default" });

    await db.insert(userTable).values({ id: userId, username, hashedPassword });

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    const createdUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    return successResponseOneObject(createdUser[0]);
  } catch (error) {
    return serverError(error);
  }
};
