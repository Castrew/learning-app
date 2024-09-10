import { NextRequest } from "next/server";
import {
  staffTable,
  treatmentStaffTable,
  treatmentTable,
} from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";

export const GET = async (
  request: NextRequest,
  { params }: { params: { staffId: string } }
) => {
  const id = params.staffId;
  try {
    const staff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, id));

    if (staff.length === 0) {
      return responses.notFoundError();
    }
    const allTreatments = await db.select().from(treatmentTable);
    const assignments = await db
      .select()
      .from(treatmentStaffTable)
      .where(eq(treatmentStaffTable.staffId, id));

    const treatments = allTreatments.filter((treatment) =>
      assignments.find((assignment) => treatment.id === assignment.treatmentId)
    );

    return responses.successResponseOneObject({
      ...staff[0],
      treatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { staffId: string } }
) => {
  const id = params.staffId;

  try {
    const staff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, id));

    await db.transaction(async (tx) => {
      await tx
        .delete(treatmentStaffTable)
        .where(eq(treatmentStaffTable.staffId, id));

      await tx.delete(staffTable).where(eq(staffTable.id, id));
    });

    return responses.successResponseOneObject(staff);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { staffId: string } }
) => {
  const id = params.staffId;
  const { name, treatmentIds } = await request.json();

  if (!name || !Array.isArray(treatmentIds)) {
    return responses.notFoundError();
  }

  try {
    await db.transaction(async (tx) => {
      await tx.update(staffTable).set({ name }).where(eq(staffTable.id, id));

      await tx
        .delete(treatmentStaffTable)
        .where(eq(treatmentStaffTable.staffId, id));

      if (treatmentIds.length > 0) {
        for (const treatmentId of treatmentIds) {
          await tx
            .insert(treatmentStaffTable)
            .values({ staffId: id, treatmentId });
        }
      }
    });

    const updatedStaff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, id));

    if (updatedStaff.length === 0) {
      return responses.notFoundError();
    }

    const assignedTreatments = await db
      .select()
      .from(treatmentStaffTable)
      .where(eq(treatmentStaffTable.staffId, id));

    return responses.successResponseOneObject({
      ...updatedStaff[0],
      treatments: assignedTreatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};
