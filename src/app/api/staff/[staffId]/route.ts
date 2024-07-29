import { NextRequest } from "next/server";
import { staffTable } from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "../../responses";

export const GET = async (
  _: NextRequest,
  param: { params: { name: string } }
) => {
  const staffName = "bobi";
  try {
    const oneStaff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.name, staffName));

    return responses.successResponseOneObject(oneStaff);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const { staffName } = await request.json();
  try {
    const existingStaff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.name, staffName));

    if (!existingStaff.length) {
      return responses.notFoundError();
    }

    await db.delete(staffTable).where(eq(staffTable.name, staffName));

    return responses.successResponseOneObject(existingStaff[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const PUT = async (request: NextRequest) => {
  const { staffName, treatmentId } = await request.json();

  try {
    await db
      .update(staffTable)
      .set({ name: staffName, treatmentId })
      .where(eq(staffTable.name, staffName));

    const updatedStaff = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.name, staffName));

    return responses.successResponseOneObject(updatedStaff[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};
