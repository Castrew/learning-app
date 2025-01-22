import { useQuery } from "@tanstack/react-query";
import { appointmentsKeys } from "../appointmentsKeys";
import { Appointment } from "../types";

export const useGetAllAppointments = () => {
  return useQuery<Appointment[], string>({
    ...appointmentsKeys.allAppointments(),
  });
};
