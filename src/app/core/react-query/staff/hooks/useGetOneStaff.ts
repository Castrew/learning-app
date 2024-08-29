import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { staffKeys } from "../staffKeys";

export const useGetOneStaff = (payload: RequestTypes["getOneStaff"]) => {
  console.log(payload, "payload");

  return useQuery({ ...staffKeys.oneStaff(payload) });
};
