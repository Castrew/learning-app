import { useQuery } from "@tanstack/react-query";
import { staffKeys } from "../staffKeys";

export const useGetAllStaff = () => {
  return useQuery({ ...staffKeys.allStaff() });
};
