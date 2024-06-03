import { useQuery } from "@tanstack/react-query";
import { treatmentsKeys } from "../treatmentsKeys";

export const useGetAllTreatments = () => {
  return useQuery({ ...treatmentsKeys.allTreatments() });
};
