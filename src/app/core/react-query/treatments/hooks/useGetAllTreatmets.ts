import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { treatmentsKeys } from "../treatmentsKeys";

export const useGetAllTreatments = () => {
  return useQuery({ ...treatmentsKeys.allTreatments() });
};
