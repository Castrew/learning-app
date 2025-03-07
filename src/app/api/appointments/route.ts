import { NextRequest } from "next/server";
import {
  userTable,
  appointmentTable,
  treatmentTable,
  staffTable,
} from "../../../../db/schema";
import { eq, ne, gt, gte, count, asc, inArray } from "drizzle-orm";
import { db } from "../../../../db/db";
import { v7 as uuidv7 } from "uuid";
import { responses } from "../responses";
import moment from "moment";
import { combineApptsByGroupId } from "../helper";

const apptQuery = {
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
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  try {
    if (searchParams.get("page") !== null) {
      const page = Number(searchParams.get("page")) || 1;
      const pageSize = Number(searchParams.get("pageSize")) || 2;

      const offset = (page - 1) * pageSize;

      const uniqueGroupIds = await db
        .selectDistinct({ groupId: appointmentTable.groupId })
        .from(appointmentTable);

      const groupIds = await db
        .selectDistinct({ groupId: appointmentTable.groupId })
        .from(appointmentTable)
        .orderBy(asc(appointmentTable.groupId))
        .offset(offset)
        .limit(pageSize);

      const paginatedAppts = await db
        .select(apptQuery)
        .from(appointmentTable)
        .innerJoin(userTable, eq(appointmentTable.userId, userTable.id))
        .innerJoin(
          treatmentTable,
          eq(appointmentTable.treatmentId, treatmentTable.id)
        )
        .innerJoin(staffTable, eq(appointmentTable.staffId, staffTable.id))
        .where(
          inArray(
            appointmentTable.groupId,
            groupIds.map((g) => g.groupId)
          )
        )
        .orderBy(asc(appointmentTable.groupId), asc(appointmentTable.id));

      if (paginatedAppts.length === 0) {
        return responses.notFoundError();
      }

      const combinedAppointmentsByGroup = combineApptsByGroupId(paginatedAppts);

      const totalCountResult = await db
        .select({ count: count(appointmentTable.groupId) })
        .from(appointmentTable);
      const totalCount = totalCountResult[0].count;

      const nextPage =
        page * pageSize < uniqueGroupIds.length ? page + 1 : undefined;

      return Response.json({
        combinedAppointmentsByGroup,
        pagination: {
          page,
          pageSize,
          total: totalCount,
          totalPages: Math.ceil(uniqueGroupIds.length / pageSize),
          nextPage,
        },
      });
    } else if (searchParams.get("userId") !== null) {
      const userId = searchParams.get("userId");
      const userAppts = await db
        .select(apptQuery)
        .from(appointmentTable)
        .innerJoin(userTable, eq(appointmentTable.userId, userTable.id))
        .innerJoin(
          treatmentTable,
          eq(appointmentTable.treatmentId, treatmentTable.id)
        )
        .innerJoin(staffTable, eq(appointmentTable.staffId, staffTable.id))
        .where(eq(appointmentTable.userId, userId));

      const combinedUserAppointments = combineApptsByGroupId(userAppts);

      return Response.json(combinedUserAppointments);
    } else {
      const allAppointments = await db
        .select(apptQuery)
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
      return Response.json(allAppointments);
    }
  } catch (error) {
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { treatmentIds, staffId, date, start } = await request.json();
  const userId = request.cookies
    .get("auth_session")
    ?.value.split("?userId=")[1] as string;

  const groupId = uuidv7();
  let newStart = moment()
    .hour(Number(start.split(":")[0]))
    .minute(Number(start.split(":")[1]));

  try {
    const treatments = await db.select().from(treatmentTable);
    for (const treatmentId of treatmentIds) {
      const id = uuidv7();
      await db.insert(appointmentTable).values({
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
