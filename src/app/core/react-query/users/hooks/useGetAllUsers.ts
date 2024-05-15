import { useQuery } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys } from "../usersKeys";

export const useGetAllUsers = () => {
  return useQuery({ ...usersKeys.allUsers() });
};
