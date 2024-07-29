import { NextRequest } from "next/server";
import { staffTable, treatmentTable } from "../../../../db/schema";
import { eq, ne, gt, gte, inArray } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../db/db";
import { responses } from "../responses";

export const GET = async (request: NextRequest) => {
  try {
    const allStaff = await db.select().from(staffTable);

    return responses.successResponseList(allStaff);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { name, treatmentId } = await request.json();
  const id = uuidv4();

  try {
    const createStaff = await db
      .insert(staffTable)
      .values({ id, name, treatmentId });

    const createdStaffId = String(createStaff[0].insertId);

    const newTreatment = await db
      .select()
      .from(staffTable)
      .where(eq(staffTable.id, createdStaffId));

    return responses.successResponseOneObject(newTreatment[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};
