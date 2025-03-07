import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import {
  appointmentsKeys,
  appointmentsMutationsKeys,
} from "../appointmentsKeys";

export const useDeleteAppointmentGroup = (
  options?: UseMutationOptions<
    unknown,
    string,
    RequestTypes["deleteAppointmentGroup"]
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...appointmentsMutationsKeys.deleteAppointment,
    onSuccess: (appointment) => {
      queryClient.invalidateQueries({
        queryKey: appointmentsKeys.userAppointments({
          userId: appointment[0].userId,
        }).queryKey,
      });
    },
    ...options,
  });
};
