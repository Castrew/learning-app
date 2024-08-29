import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
} from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";

const queryAppointment = {};

export const GET = async (request: NextRequest) => {
  const { groupId } = await request.json();

  try {
    // Fetch all appointments with the given groupId
    const appointments = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    if (appointments.length === 0) {
      return responses.notFoundError();
    }

    return responses.successResponseList(appointments);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const { groupId } = await request.json();

  try {
    const appointment = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));
    await db.transaction(async (tx) => {
      await tx
        .delete(appointmentTable)
        .where(eq(appointmentTable.groupId, groupId));
    });

    return responses.successResponseOneObject(appointment);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const PUT = async (request: NextRequest) => {
  const { groupId, appointments } = await request.json();

  try {
    // Start a transaction to ensure all updates are performed together
    await db.transaction(async (tx) => {
      // First, delete existing appointments in the group to avoid duplications
      await tx
        .delete(appointmentTable)
        .where(eq(appointmentTable.groupId, groupId));

      // Then, reinsert the updated appointments with the same groupId
      for (const appointment of appointments) {
        const { id, userId, treatmentId, staffId, date, start, duration } =
          appointment;

        await tx.insert(appointmentTable).values({
          id: id,
          userId,
          treatmentId,
          staffId,
          date,
          start,
          groupId, // Ensure the group ID remains consistent
        });
      }
    });

    // Fetch and return the updated appointments
    const updatedAppointments = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    return responses.successResponseList(updatedAppointments);
  } catch (error) {
    return responses.serverError(error);
  }
};
