import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import {
  appointmentsKeys,
  appointmentsMutationsKeys,
} from "../appointmentsKeys";
import { Appointment } from "../types";

export const useDeleteAppointmentGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Appointment,
    string,
    RequestTypes["deleteAppointmentGroup"]
  >({
    ...appointmentsMutationsKeys.deleteAppointment,
    onSuccess: (appointment, variables) => {
      queryClient.invalidateQueries({
        queryKey: appointmentsKeys.userAppointments({
          userId: appointment[0].userId,
        }).queryKey,
      });
    },
  });
};
