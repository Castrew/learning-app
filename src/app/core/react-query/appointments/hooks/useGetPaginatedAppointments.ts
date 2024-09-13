import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { appointmentsKeys } from "../appointmentsKeys";
import { RequestTypes } from "../requestTypes";

export const useGetPaginatedAppointments = (
  payload: RequestTypes["paginatedAppointments"]
) => {
  return useQuery({
    ...appointmentsKeys.paginatedAppointments(payload),
    placeholderData: keepPreviousData,
  });
};
