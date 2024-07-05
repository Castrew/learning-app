import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { treatmentTable } from "../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import * as schema from "../../../../db/schema";
import { v4 as uuidv4 } from "uuid";

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

    const allTreatments = await db.select().from(treatmentTable);
    return successResponseList(allTreatments);
  } catch (error) {
    return serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { title, duration, price, description } = await request.json();
  const id = uuidv4();

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection, { schema, mode: "default" });
    const createTreatment = await db
      .insert(treatmentTable)
      .values({ id, title, duration, price, description });

    const createdTreatmentId = String(createTreatment[0].insertId);

    const newTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, createdTreatmentId));

    return successResponseOneObject(newTreatment[0]);
  } catch (error) {
    return serverError(error);
  }
};
