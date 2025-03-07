import { useQueryClient, useMutation } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys, usersMutationsKeys } from "../usersKeys";
import { User } from "../types";

export const useSignInUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, string, RequestTypes["signUpUser"]>({
    ...usersMutationsKeys.signInUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.allUsers._def,
      });
    },
  });
};
