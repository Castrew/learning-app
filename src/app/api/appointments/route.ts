import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
} from "../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import { responses } from "../responses";

const queryAppointment = {
  id: appointmentTable.id,
  start: appointmentTable.start,
  end: appointmentTable.end,
  user: {
    id: userTable.id,
    name: userTable.username,
    // email: userTable.email,
  },
  treatment: {
    id: treatmentTable.id,
    title: treatmentTable.title,
    duration: treatmentTable.duration,
    price: treatmentTable.price,
  },
};

export const GET = async (request: NextRequest) => {
  try {
    const appointments = await db
      .select(queryAppointment)
      .from(appointmentTable)
      .leftJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .leftJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      );

    return responses.successResponseList(appointments);
  } catch (error) {
    // Returning error if there is something wrong
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const id = uuidv4();
  // const { email, name } = await request.json();
  // const userId = 1;
  // const treatmentId = 1;

  try {
    // Parse the request body to get the new appointment data
    // const { userId, treatmentId, start, end } = await request.json();

    const userId = "40";
    const treatmentId = "1";
    const start = "2021-09-01 10:00:00";
    const end = "2021-09-01 11:00:00";

    // Ensure the user exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!existingUser.length) {
      return responses.notFoundError();
    }

    // Ensure the treatment exists
    const existingTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    if (!existingTreatment.length) {
      return responses.notFoundError();
    }

    // Insert the new appointment
    const insertedAppointment = await db.insert(appointmentTable).values({
      id,
      userId,
      treatmentId,
      start,
      end,
    });

    const createdAppointment = await db
      .select(queryAppointment)
      .from(appointmentTable)
      .where(eq(appointmentTable.id, String(insertedAppointment[0].insertId)))
      .leftJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .leftJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      );

    return responses.successResponseOneObject(createdAppointment);
  } catch (error) {
    return responses.serverError(error);
  }
};
