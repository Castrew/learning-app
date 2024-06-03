import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { user, appointment, treatment } from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import * as schema from "../../../../../db/schema";

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

const queryAppointment = {
  id: appointment.id,
  start: appointment.start,
  end: appointment.end,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  treatment: {
    id: treatment.id,
    treatment: treatment.treatment,
    duration: treatment.duration,
    price: treatment.price,
  },
};

export const GET = async (request: NextRequest) => {
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    // Making a connection to the server
    const db = drizzle(connection, { schema, mode: "default" });

    // Fettching all the data from table user

    const appointmentInfo = await db
      .select(queryAppointment)
      .from(appointment)
      .where(eq(appointment.id, 8))
      .leftJoin(user, eq(appointment.user_id, user.id))
      .leftJoin(treatment, eq(appointment.treatment_id, treatment.id));

    if (!appointmentInfo || appointmentInfo.length === 0) {
      return notFoundError();
    }

    // Returning the data
    return successResponseOneObject(appointmentInfo);
  } catch (error) {
    // Returning error if there is something wrong
    return serverError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    // Making a connection to the server
    const db = drizzle(connection, { schema, mode: "default" });

    const existingAppointment = await db
      .select(queryAppointment)
      .from(appointment)
      .where(eq(appointment.id, 16))
      .leftJoin(user, eq(appointment.user_id, user.id))
      .leftJoin(treatment, eq(appointment.treatment_id, treatment.id));

    if (!existingAppointment) {
      return notFoundError();
    }

    await db.delete(appointment).where(eq(appointment.id, 16));

    return successResponseOneObject(existingAppointment);
  } catch (error) {
    return serverError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection);

    const updateAppointment = await db
      .update(appointment)
      .set({ user_id: BigInt(40) })
      .where(eq(appointment.id, 1));

    const updatedAppointment = await db
      .select(queryAppointment)
      .from(appointment)
      .where(eq(appointment.id, 1))
      .leftJoin(user, eq(appointment.user_id, user.id))
      .leftJoin(treatment, eq(appointment.treatment_id, treatment.id));

    return successResponseOneObject(updatedAppointment);
  } catch (error) {
    return serverError(error);
  }
};
