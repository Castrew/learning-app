import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { appointmentsKeys } from "../appointmentsKeys";
import { Appointment, GroupedAppointment } from "../types";

export const useGetUserAppointments = (
  payload: RequestTypes["getUserAppointments"]
) => {
  return useQuery<GroupedAppointment[], string>({
    ...appointmentsKeys.userAppointments(payload),
    enabled: payload.userId !== "undefined",
  });
};
