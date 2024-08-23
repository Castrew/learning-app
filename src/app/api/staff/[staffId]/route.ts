import { NextRequest } from "next/server";
import { staffTable, treatmentStaffTable } from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";

export const GET = async (request: NextRequest) => {
  const { id } = await request.json(); // Assume ID is passed in the request

  try {
    // Fetch the staff member
    const staff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, id));

    if (staff.length === 0) {
      return responses.notFoundError();
    }

    // Fetch the assigned treatments
    const treatments = await db
      .select()
      .from(treatmentStaffTable)
      .where(eq(treatmentStaffTable.staffId, id));

    return responses.successResponseOneObject({
      ...staff[0],
      treatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();

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

export const PUT = async (request: NextRequest) => {
  const { id, name, treatmentIds } = await request.json();

  try {
    await db.transaction(async (tx) => {
      await tx.update(staffTable).set({ name }).where(eq(staffTable.id, id));

      await tx
        .delete(treatmentStaffTable)
        .where(eq(treatmentStaffTable.staffId, id));

      if (Array.isArray(treatmentIds)) {
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
