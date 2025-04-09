import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { appointmentsKeys } from "../appointmentsKeys";
import { Appointment } from "../types";
import { useEffect } from "react";
import { AxiosError } from "axios";

export const useGetAllAppointments = (
  options?: Omit<
    UseQueryOptions<Appointment[], AxiosError, Appointment[]>,
    "queryKey"
  > & {
    onSuccess?: (data: Appointment[]) => void;
    onError?: (errorMessage: AxiosError) => void;
  }
) => {
  const result = useQuery({
    ...appointmentsKeys.allAppointments(),
    ...options,
  });

  // ReactQuery onResponce callbacks

  useEffect(() => {
    if (!result.isFetching && result.isSuccess) {
      options?.onSuccess?.(result.data);
    }
  }, [result.isSuccess, result.isRefetching]);

  useEffect(() => {
    if (result.isError) {
      options?.onError?.(result.error);
    }
  }, [result.isSuccess]);

  return result;
};
