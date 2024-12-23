import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "src/app/axios/api-axios-instance";
import { Staff } from "./types";

export const staffKeys = createQueryKeys("staff", {
  allStaff: () => {
    return {
      queryKey: ["staff"],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get("/staff");
        return data;
      },
    };
  },
  oneStaff: ({ staffId }) => {
    return {
      queryKey: [staffId],

      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(`/staff/${staffId}`);
        return data;
      },
    };
  },
});

export const staffMutationsKeys = createMutationKeys("staff", {
  deleteStaff: {
    mutationKey: null,
    mutationFn: async ({ staffId }: RequestTypes["deleteStaff"]) => {
      const { data } = await APIAxiosInstance.delete(`/staff/${staffId}`);
      return data;
    },
  },
  updateStaff: {
    mutationKey: null,
    mutationFn: async ({ staffId, ...rest }: RequestTypes["updateStaff"]) => {
      const { data } = await APIAxiosInstance.put(`/staff/${staffId}`, rest);

      return data;
    },
  },
  createStaff: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["createStaff"]) => {
      const { data } = await APIAxiosInstance.post(`/staff`, payload);
      return data;
    },
  },
});
