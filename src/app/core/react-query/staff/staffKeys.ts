import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "@/app/axios/api-axios-instance";

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
  oneStaff: ({ name }) => {
    return {
      queryKey: [name],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(`/staff/${name}`);
        return data;
      },
    };
  },
});

export const staffMutationsKeys = createMutationKeys("staff", {
  deleteStaff: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["deleteStaff"]) => {
      const { data } = await APIAxiosInstance.delete(`/staff/${payload.name}`);
      return data;
    },
  },
  updateStaff: {
    mutationKey: null,
    mutationFn: async ({ name, ...rest }: RequestTypes["updateStaff"]) => {
      const { data } = await APIAxiosInstance.put(`/staff/${name}`, rest);

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
