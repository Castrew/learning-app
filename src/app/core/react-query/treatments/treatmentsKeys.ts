import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "src/app/axios/api-axios-instance";

export const treatmentsKeys = createQueryKeys("treatments", {
  allTreatments: () => {
    return {
      queryKey: ["treatments"],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get("/treatments");
        return data;
      },
    };
  },
  oneTreatment: ({ treatmentId }) => {
    return {
      queryKey: [treatmentId],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(
          `/treatments/${treatmentId}`
        );
        return data;
      },
    };
  },
});

export const treatmentsMutationsKeys = createMutationKeys("treatments", {
  deleteTreatment: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["deleteTreatment"]) => {
      const { data } = await APIAxiosInstance.delete(
        `/treatments/${payload.treatmentId}`
      );
      return data;
    },
  },
  updateTreatment: {
    mutationKey: null,
    mutationFn: async ({
      treatmentId,
      ...rest
    }: RequestTypes["updateTreatment"]) => {
      const { data } = await APIAxiosInstance.put(
        `/treatments/${treatmentId}`,
        rest
      );

      return data;
    },
  },
  createTreatment: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["createTreatment"]) => {
      const { data } = await APIAxiosInstance.post(`/treatments`, payload);
      return data;
    },
  },
});
