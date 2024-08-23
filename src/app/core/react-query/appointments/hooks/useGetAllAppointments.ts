import { useQuery } from "@tanstack/react-query";
import { appointmentsKeys } from "../appointmentsKeys";

export const useGetAllAppointments = () => {
  return useQuery({ ...appointmentsKeys.allAppointments() });
};
