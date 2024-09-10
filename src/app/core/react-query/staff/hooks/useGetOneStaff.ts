import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { staffKeys } from "../staffKeys";

export const useGetOneStaff = (payload: RequestTypes["getOneStaff"]) => {
  return useQuery({
    ...staffKeys.oneStaff(payload),
    enabled: payload.staffId !== "undefined",
  });
};
