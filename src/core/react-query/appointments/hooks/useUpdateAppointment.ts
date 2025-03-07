import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import {
  appointmentsKeys,
  appointmentsMutationsKeys,
} from "../appointmentsKeys";
import { Appointment } from "../types";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<Appointment, string, RequestTypes["updateAppointment"]>({
    ...appointmentsMutationsKeys.updateAppointment,
    onSuccess: (appointment, variables) => {
      queryClient.invalidateQueries({
        queryKey: appointmentsKeys.userAppointments({
          userId: appointment.userId,
        }).queryKey,
      });
    },
  });
};
