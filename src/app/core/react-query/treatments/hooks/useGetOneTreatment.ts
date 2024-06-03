import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys } from "../treatmentsKeys";

export const useGetOneTreatment = (
  payload: RequestTypes["getOneTreatment"]
) => {
  console.log(payload);

  return useQuery({ ...treatmentsKeys.oneTreatment(payload) });
};
