import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { user } from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { NextApiResponse } from "next";

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

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: number } }
) => {
  const userId = params.userId;

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    // Making a connection to the server
    const db = drizzle(connection);

    // Fettching the data from table user for this user
    const oneUser = await db.select().from(user).where(eq(user.id, userId));
    // Returning the data
    return successResponseOneObject(oneUser);
  } catch (error) {
    // Returning error if there is something wrong
    return serverError(error);
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { userId: number } }
) => {
  console.log(params.userId, "params");
  const userId = params.userId;
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    // Fetch the record with the specified ID
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    // If the record doesn't exist, return an error
    if (!existingUser.length) {
      return notFoundError();
    }

    // Extract the ID of the deleted record or whatever you want to show
    const deletedUser = {
      id: existingUser[0].id,
      name: existingUser[0].name,
      email: existingUser[0].email,
    };

    // Delete the record
    await db.delete(user).where(eq(user.id, userId));

    // Return the deleted ID in the response
    return successResponseOneObject(deletedUser);
  } catch (error) {
    return serverError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  const { name, email } = await request.json();
  const userId = params.userId;
  console.log(name, email, params.userId);

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    // In table user where colomn id = userId
    // updating column name = name
    const updateUser = await db
      .update(user)
      .set({ name: name, email: email })
      .where(eq(user.id, userId));

    // Fetchng the updated user information
    const updatedUserInfo = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    // Colecting the updated user information so we can show it
    const updatedUser = {
      id: updatedUserInfo[0].id,
      name: updatedUserInfo[0].name,
      email: updatedUserInfo[0].email,
    };

    // Return the updated user informaton in the response
    return successResponseOneObject({});
  } catch (error) {
    return serverError(error);
  }
};
