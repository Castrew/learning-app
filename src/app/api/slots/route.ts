import { NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  treatmentTable,
  appointmentTable,
  userTable,
} from "../../../../db/schema";
import { eq, ne, gt, gte, inArray } from "drizzle-orm";
import { NextApiResponse } from "next";
import { db } from "../../../../db/db";
import { Treatment } from "@/app/core/react-query/treatments/types";
import moment from "moment";

interface AvailableSlotsRequest {
  selectedTreatments: string[];
  date: string; // Date in 'YYYY-MM-DD' format
}

export const POST = async (request: NextRequest) => {
  // const { selectedTreatments, date }: AvailableSlotsRequest =
  //   await request.json();

  const selectedTreatments = ["47723668-fa67-4fda-80ac-9c6a19b8b469"];
  const date = "2000-05-21";

  try {
    // Get the duration of the selected treatments
    const treatments = await db
      .select({ duration: treatmentTable.duration })
      .from(treatmentTable)
      .where(inArray(treatmentTable.id, selectedTreatments));

    const totalDuration = treatments.reduce(
      (sum, treatment) => sum + parseInt(treatment.duration),
      0
    );

    // Fetch existing appointments for the given date
    const appointments = await db
      .select({
        start: appointmentTable.start,
        end: appointmentTable.end,
      })
      .from(appointmentTable)
      .where(eq(appointmentTable.start, date));
    const availableSlots = calculateAvailableSlots(appointments, totalDuration);

    return new Response(JSON.stringify(availableSlots), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

function calculateAvailableSlots(appointments: any, totalDuration: any) {
  const slots = [];
  const startOfDay = moment().startOf("day");
  const endOfDay = moment().endOf("day");
  const durationInMinutes = totalDuration;

  for (
    let time = startOfDay;
    time.isBefore(endOfDay);
    time.add(30, "minutes")
  ) {
    const slotStart = time.clone();
    const slotEnd = time.clone().add(durationInMinutes, "minutes");
    const isFree = !appointments.some(
      (appointment: any) =>
        moment(appointment.start).isBefore(slotEnd) &&
        moment(appointment.end).isAfter(slotStart)
    );

    if (isFree) {
      slots.push(slotStart.format("HH:mm"));
    }
  }
  console.log(slots);

  return slots;
}
