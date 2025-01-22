import { NextRequest } from "next/server";
import {
  staffTable,
  treatmentStaffTable,
  treatmentTable,
} from "../../../../db/schema";
import { eq, ne, gt, gte, inArray } from "drizzle-orm";
import { db } from "../../../../db/db";
import { responses } from "../responses";

export const GET = async (_: NextRequest) => {
  try {
    const allStaff = await db.select().from(staffTable);
    const allAssignments = await db.select().from(treatmentStaffTable);
    const allTreatments = await db.select().from(treatmentTable);

    const staffWithTreatments = allStaff.map((staff) => {
      const treatments = allAssignments
        .filter((assignment) => assignment.staffId === staff.id)
        .map(({ treatmentId }) =>
          allTreatments.find((treatment) => {
            return treatment.id === treatmentId;
          })
        );

      return { ...staff, treatments };
    });
    return Response.json(staffWithTreatments);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { id, name, treatmentIds } = await request.json();

  try {
    await db.transaction(async (tx) => {
      await tx.insert(staffTable).values({ id, name });

      if (Array.isArray(treatmentIds)) {
        for (const treatmentId of treatmentIds) {
          await tx
            .insert(treatmentStaffTable)
            .values({ staffId: id, treatmentId });
        }
      }
    });

    const newStaff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, id));
    const assignedTreatments = await db
      .select()
      .from(treatmentStaffTable)
      .where(eq(treatmentStaffTable.staffId, id));

    return Response.json({
      ...newStaff[0],
      treatments: assignedTreatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};
