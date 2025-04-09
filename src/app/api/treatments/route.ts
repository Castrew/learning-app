import { NextRequest } from "next/server";
import { treatmentTable } from "../../../../db/schema";
import { eq, ne, gt, gte } from "drizzle-orm";
import { v7 as uuidv7 } from "uuid";
import { db } from "../../../../db/db";
import { responses } from "src/helper/responses";

export const GET = async (_: NextRequest) => {
  try {
    const allTreatments = await db.select().from(treatmentTable);
    return Response.json(allTreatments);
  } catch (error) {
    return responses.serverError(error);
  }
};

export const POST = async (request: NextRequest) => {
  const { title, duration, price, description } = await request.json();
  const id = uuidv7();

  try {
    await db
      .insert(treatmentTable)
      .values({ id, title, duration, price, description });

    const newTreatment = await db
      .select()
      .from(treatmentTable)
      .where(eq(treatmentTable.id, id));

    return Response.json(newTreatment[0]);
  } catch (error) {
    return responses.serverError(error);
  }
};
