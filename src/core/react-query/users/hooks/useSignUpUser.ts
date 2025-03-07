import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys, usersMutationsKeys } from "../usersKeys";
import { User } from "../types";

export const useSignUpUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, string, RequestTypes["signUpUser"]>({
    ...usersMutationsKeys.signUpUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.allUsers._def,
      });
    },
  });
};
