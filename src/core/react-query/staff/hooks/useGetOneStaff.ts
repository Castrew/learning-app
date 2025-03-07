import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { staffKeys } from "../staffKeys";
import { Staff } from "../types";

export const useGetOneStaff = (payload: RequestTypes["getOneStaff"]) => {
  return useQuery<Staff, string>({
    ...staffKeys.oneStaff(payload),
    enabled: payload.staffId !== "undefined",
  });
};
