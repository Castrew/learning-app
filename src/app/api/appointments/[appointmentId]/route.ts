import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
} from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";

const queryAppointment = {
  id: appointmentTable.id,
  start: appointmentTable.start,
  end: appointmentTable.end,
  user: {
    id: userTable.id,
    name: userTable.username,
  },
  treatment: {
    id: treatmentTable.id,
    treatment: treatmentTable.title,
    duration: treatmentTable.duration,
    price: treatmentTable.price,
  },
};

export const GET = async (request: NextRequest) => {
  try {
    const appointmentInfo = await db
      .select(queryAppointment)
      .from(appointmentTable)
      .where(eq(appointmentTable.id, "8"))
      .leftJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .leftJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      );

    if (!appointmentInfo || appointmentInfo.length === 0) {
      return responses.notFoundError();
    }

    return responses.successResponseOneObject(appointmentInfo);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const existingAppointment = await db
      .select(queryAppointment)
      .from(appointmentTable)
      .where(eq(appointmentTable.id, "16"))
      .leftJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .leftJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      );

    if (!existingAppointment) {
      return responses.notFoundError();
    }

    await db.delete(appointmentTable).where(eq(appointmentTable.id, "16"));

    return responses.successResponseOneObject(existingAppointment);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    const updateAppointment = await db
      .update(appointmentTable)
      .set({ userId: "40" })
      .where(eq(appointmentTable.id, "1"));

    const updatedAppointment = await db
      .select(queryAppointment)
      .from(appointmentTable)
      .where(eq(appointmentTable.id, "1"))
      .leftJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .leftJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      );

    return responses.successResponseOneObject(updatedAppointment);
  } catch (error) {
    return responses.serverError(error);
  }
};
