import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
  staffTable,
} from "../../../../db/schema";
import { eq, ne, gt, gte, inArray } from "drizzle-orm";
import { db } from "../../../../db/db";
import { v4 as uuidv4 } from "uuid";
import { responses } from "../responses";
import moment from "moment";

const queryAppointment = {};

export const GET = async () => {
  try {
    // Fetch all appointments with related details from user, treatment, and staff tables
    const allAppointments = await db
      .select({
        appointmentId: appointmentTable.id,
        userId: appointmentTable.userId,
        username: userTable.username,
        treatmentId: appointmentTable.treatmentId,
        treatmentTitle: treatmentTable.title,
        treatmentDescription: treatmentTable.description,
        treatmentDuration: treatmentTable.duration,
        staffId: appointmentTable.staffId,
        staffName: staffTable.name,
        date: appointmentTable.date,
        start: appointmentTable.start,
        groupId: appointmentTable.groupId,
      })
      .from(appointmentTable)
      .innerJoin(userTable, eq(appointmentTable.userId, userTable.id))
      .innerJoin(
        treatmentTable,
        eq(appointmentTable.treatmentId, treatmentTable.id)
      )
      .innerJoin(staffTable, eq(appointmentTable.staffId, staffTable.id));

    if (allAppointments.length === 0) {
      return responses.notFoundError();
    }

    return responses.successResponseList(allAppointments);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { treatmentIds, staffId, date, start } = await request.json();
  const userId = request.cookies
    .get("auth_session")
    ?.value.split("?userId=")[1] as string;

  const groupId = uuidv4();
  let newStart = moment()
    .hour(Number(start.split(":")[0]))
    .minute(Number(start.split(":")[1]));

  try {
    const treatments = await db.select().from(treatmentTable);
    await db.transaction(async (tx) => {
      for (const treatmentId of treatmentIds) {
        const id = uuidv4();
        await tx.insert(appointmentTable).values({
          id,
          userId,
          treatmentId,
          staffId,
          date,
          start: newStart.format("HH:mm"),
          groupId, // Assign group ID to each appointment
        });
        const treatmentInfo = treatments.find(
          (treatment) => treatment.id === treatmentId
        );
        if (treatmentInfo) {
          newStart.add(treatmentInfo.duration, "minute");
        }
      }
    });

    // Fetch and return the newly created appointments
    const createdAppointments = await db
      .select()
      .from(appointmentTable)
      .where(eq(appointmentTable.groupId, groupId));

    return responses.successResponseList(createdAppointments);
  } catch (error) {
    return responses.serverError(error);
  }
};
