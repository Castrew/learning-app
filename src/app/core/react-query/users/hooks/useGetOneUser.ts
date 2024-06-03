import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys } from "../usersKeys";

export const useGetOneUser = (payload: RequestTypes["getOneUser"]) => {
  return useQuery({ ...usersKeys.oneUser(payload) });
};
