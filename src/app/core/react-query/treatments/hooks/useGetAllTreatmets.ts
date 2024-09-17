import { useQuery } from "@tanstack/react-query";
import { treatmentsKeys } from "../treatmentsKeys";
import { Treatment } from "../types";

export const useGetAllTreatments = () => {
  return useQuery<Treatment[], string>({ ...treatmentsKeys.allTreatments() });
};
