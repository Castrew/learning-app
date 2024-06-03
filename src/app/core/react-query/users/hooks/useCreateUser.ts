import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys, usersMutationsKeys } from "../usersKeys";
import { User } from "../types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, string, RequestTypes["createUser"]>({
    ...usersMutationsKeys.createUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.allUsers._def,
      });
    },
  });
};
