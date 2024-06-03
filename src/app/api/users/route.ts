import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { user } from "../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import * as schema from "../../../../db/schema";

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

export const GET = async (request: NextRequest) => {
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    const allUsers = await db.select().from(user);
    return successResponseList(allUsers);
  } catch (error) {
    return serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { email, name } = await request.json();
  console.log(email, name);

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection, { schema, mode: "default" });
    const createUserDBResponse = await db.insert(user).values({ name, email });

    const createdUserId = createUserDBResponse[0].insertId;
    const createdUser = await db.query.user.findMany({
      where: eq(user.id, createdUserId),
    });

    return successResponseOneObject(createdUser[0]);
  } catch (error) {
    return serverError(error);
  }
};
