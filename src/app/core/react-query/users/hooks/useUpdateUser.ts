import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { usersKeys, usersMutationsKeys } from "../usersKeys";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, string, RequestTypes["updateUser"]>({
    ...usersMutationsKeys.updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.allUsers._def,
      });
    },
  });
};
