import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { appointmentsKeys } from "../appointmentsKeys";
import { RequestTypes } from "../requestTypes";
import { CombinedAppointmentsResponse } from "../types";

export const useGetPaginatedAppointments = (
  payload: RequestTypes["paginatedAppointments"]
) => {
  return useQuery<CombinedAppointmentsResponse, string>({
    ...appointmentsKeys.paginatedAppointments(payload),
    placeholderData: keepPreviousData,
  });
};
