import { NextRequest } from "next/server";
import { treatmentTable } from "../../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { db } from "../../../../../db/db";
import { responses } from "src/helper/responses";

export const GET = async (_: NextRequest, { params }) => {
  const treatmentId = params.treatmentId;

  try {
    const oneTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    return Response.json(oneTreatment[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const DELETE = async (_: NextRequest, { params }) => {
  const treatmentId = params.treatmentId;
  try {
    const existingTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    if (!existingTreatment.length) {
      return responses.notFoundError();
    }

    await db.delete(treatmentTable).where(eq(treatmentTable.id, treatmentId));

    return Response.json(existingTreatment[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const PUT = async (request: NextRequest, { params }) => {
  const { title, duration, price, description } = await request.json();
  const treatmentId = params.treatmentId;

  try {
    await db
      .update(treatmentTable)
      .set({ title, price, duration, description })
      .where(eq(treatmentTable.id, treatmentId));

    const uodatedTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, treatmentId));

    return responses.successResponseOneObject(uodatedTreatment[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};
