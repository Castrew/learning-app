import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
  staffTable,
} from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";
import moment from "moment";
import { findEarliestAppointment } from "../../helper";
import { v7 as uuidv7 } from "uuid";

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
  const { groupId, treatmentId } = await request.json();

  try {
    const oldGroupAppt = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    const treatmentIds = oldGroupAppt
      .filter((appt) => appt.treatmentId !== treatmentId)
      .map((appt) => appt.treatmentId);

    const earliestAppointment = findEarliestAppointment(oldGroupAppt);

    const treatments = await db.select().from(treatmentTable);

    await db
      .delete(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    let newStart = moment()
      .hour(Number(earliestAppointment.start.split(":")[0]))
      .minute(Number(earliestAppointment.start.split(":")[1]));

    for (const treatmentId of treatmentIds) {
      const id = uuidv7();
      await db.insert(appointmentTable).values({
        id,
        userId: earliestAppointment.userId,
        treatmentId,
        staffId: earliestAppointment.staffId,
        date: earliestAppointment.date,
        start: newStart.format("HH:mm"),
        groupId,
      });
      const treatmentInfo = treatments.find(
        (treatment) => treatment.id === treatmentId
      );
      if (treatmentInfo) {
        newStart.add(treatmentInfo.duration, "minute");
      }
    }

    const updatedAppt = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    return Response.json(updatedAppt[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};
