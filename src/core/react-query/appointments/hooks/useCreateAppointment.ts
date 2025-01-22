import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import {
  appointmentsKeys,
  appointmentsMutationsKeys,
} from "../appointmentsKeys";
import { Appointment } from "../types";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<Appointment, string, RequestTypes["createAppointment"]>({
    ...appointmentsMutationsKeys.createAppointment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: appointmentsKeys.allAppointments._def,
      });
    },
  });
};
