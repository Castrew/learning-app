import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestTypes } from "../requestTypes";
import { staffMutationsKeys } from "../staffKeys";
import { Staff } from "../types";
import { v7 as uuidv7 } from "uuid";

interface ContextType {
  previousStaffData?: Staff[];
}

//Optimistic update with cache

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<Staff, string, RequestTypes["createStaff"], ContextType>({
    ...staffMutationsKeys.createStaff,
    onMutate: async (createdMember) => {
      createdMember.id = uuidv7();
      await queryClient.cancelQueries({
        queryKey: ["staff", "allStaff", "staff"],
      });
      const previousStaffData: Staff[] = queryClient.getQueryData([
        "staff",
        "allStaff",
        "staff",
      ]);
      queryClient.setQueryData(["staff", "allStaff", "staff"], (old: any) => [
        ...old,
        createdMember,
      ]);

      return { previousStaffData };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousStaffData) {
        console.log("greshka");

        queryClient.setQueryData(
          ["staff", "allStaff", "staff"],
          context.previousStaffData
        );
      }
    },
    onSettled: (_, variables) => {
      console.log("w krajna smetka");

      queryClient.invalidateQueries({
        queryKey: ["staff", "allStaff", "staff"],
      });
    },
  });
};
