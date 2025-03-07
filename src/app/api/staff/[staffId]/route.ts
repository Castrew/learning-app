import { NextRequest } from "next/server";
import {
  staffTable,
  treatmentStaffTable,
  treatmentTable,
} from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "src/helper/responses";

export const GET = async (
  _: NextRequest,
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

    return Response.json({
      ...staff[0],
      treatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (
  _: NextRequest,
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

    return Response.json(staff);
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

    return Response.json({
      ...updatedStaff[0],
      treatments: assignedTreatments,
    });
  } catch (error) {
    return responses.serverError(error);
  }
};
