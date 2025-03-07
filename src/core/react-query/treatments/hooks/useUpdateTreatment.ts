import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys, treatmentsMutationsKeys } from "../treatmentsKeys";
import { Treatment } from "../types";

export const useUpdateTreatment = () => {
  const queryClient = useQueryClient();

  return useMutation<Treatment, string, RequestTypes["updateTreatment"]>({
    ...treatmentsMutationsKeys.updateTreatment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: treatmentsKeys.allTreatments._def,
      });
    },
  });
};
