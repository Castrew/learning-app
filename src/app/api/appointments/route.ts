import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { user, appointment, treatment } from "../../../../db/schema";
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
    title: treatment.title,
    duration: treatment.duration,
    price: treatment.price,
  },
};

// FC that will fetch all the data from the table user
export const GET = async (request: NextRequest) => {
  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    // Making a connection to the server
    const db = drizzle(connection, { schema, mode: "default" });

    // Fettching all the data from table user

    const appointments = await db
      .select(queryAppointment)
      .from(schema.appointment)
      .leftJoin(user, eq(schema.appointment.user_id, user.id))
      .leftJoin(
        schema.treatment,
        eq(schema.appointment.treatment_id, schema.treatment.id)
      );

    // const allAppointments = await db
    //   .select()
    //   .from(schema.appointment)
    //   .leftJoin(schema.user, eq(schema.user.id, schema.appointment.user_id));
    // Returning the data
    return successResponseList(appointments);
  } catch (error) {
    // Returning error if there is something wrong
    return serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { email, name } = await request.json();
  const userId = 1;
  const treatmentId = 1;

  try {
    const connection = await mysql.createConnection({
      ...dbServer,
    });
    const db = drizzle(connection, { schema, mode: "default" });

    // Parse the request body to get the new appointment data
    // const { userId, treatmentId, start, end } = await request.json();

    const userId = 40;
    const treatmentId = 1;
    const start = "2021-09-01 10:00:00";
    const end = "2021-09-01 11:00:00";

    // Ensure the user exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!existingUser.length) {
      return new Response("User not found", { status: 404 });
    }

    // Ensure the treatment exists
    const existingTreatment = await db
      .select()
      .from(treatment)
      .where(eq(treatment.id, treatmentId));

    if (!existingTreatment.length) {
      return new Response("Treatment not found", { status: 404 });
    }

    // Insert the new appointment
    const [insertedAppointment] = await db.insert(appointment).values({
      user_id: BigInt(userId),
      treatment_id: BigInt(treatmentId),
      start,
      end,
    });

    const createdAppointment = await db
      .select(queryAppointment)
      .from(appointment)
      .where(eq(appointment.id, insertedAppointment.insertId))
      .leftJoin(user, eq(appointment.user_id, user.id))
      .leftJoin(treatment, eq(appointment.treatment_id, treatment.id));

    return successResponseOneObject(createdAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
