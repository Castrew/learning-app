import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { staffKeys, staffMutationsKeys } from "../staffKeys";
import { Staff } from "../types";

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<Staff, string, RequestTypes["deleteStaff"]>({
    ...staffMutationsKeys.deleteStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: staffKeys.allStaff._def,
      });
    },
  });
};
