import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { treatmentTable } from "../../../../../db/schema";
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
  { params }: { params: { treatmentId: string } }
) => {
  const treatmentId = params.treatmentId;

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    const oneTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    return successResponseOneObject(oneTreatment);
  } catch (error) {
    return serverError(error);
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { treatmentId: string } }
) => {
  const treatmentId = params.treatmentId;
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    const existingTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    if (!existingTreatment.length) {
      return notFoundError();
    }

    await db.delete(treatmentTable).where(eq(treatmentTable.id, treatmentId));

    return successResponseOneObject(existingTreatment[0]);
  } catch (error) {
    return serverError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  const { title, duration, price, description } = await request.json();
  const treatmentId = params.treatmentId;

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    const updateTreatment = await db
      .update(treatmentTable)
      .set({ title, price, duration, description })
      .where(eq(treatmentTable.id, treatmentId));

    const uodatedTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    return successResponseOneObject(uodatedTreatment[0]);
  } catch (error) {
    return serverError(error);
  }
};
