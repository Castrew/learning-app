import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys } from "../treatmentsKeys";
import { Treatment } from "../types";

export const useGetOneTreatment = (
  payload: RequestTypes["getOneTreatment"]
) => {
  return useQuery<Treatment, string>({
    ...treatmentsKeys.oneTreatment(payload),
    enabled: payload.treatmentId !== "undefined",
  });
};
