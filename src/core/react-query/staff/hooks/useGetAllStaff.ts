import { useQuery } from "@tanstack/react-query";
import { staffKeys } from "../staffKeys";
import { Staff } from "../types";

export const useGetAllStaff = () => {
  return useQuery<Staff[], string>(staffKeys.allStaff());
};
