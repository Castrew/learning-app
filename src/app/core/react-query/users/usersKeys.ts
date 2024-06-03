import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "@/app/axios/api-axios-instance";

export const usersKeys = createQueryKeys("users", {
  allUsers: () => {
    return {
      queryKey: ["users"],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get("/users");
        return data;
      },
    };
  },
  oneUser: ({ userId }) => {
    return {
      queryKey: [userId],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(`/users/${userId}`);
        return data;
      },
    };
  },
});

export const usersMutationsKeys = createMutationKeys("users", {
  deleteUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["deleteUser"]) => {
      console.log(payload.id);

      const { data } = await APIAxiosInstance.delete(`/users/${payload.id}`);
      return data;
    },
  },
  updateUser: {
    mutationKey: null,
    mutationFn: async ({ id, ...rest }: RequestTypes["updateUser"]) => {
      const { data } = await APIAxiosInstance.put(`/users/${id}`, rest);
      console.log(id, "id tuka", rest);

      return data;
    },
  },
  createUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["createUser"]) => {
      console.log(payload, "payload");

      const { data } = await APIAxiosInstance.post(`/users`, payload);
      return data;
    },
  },
});
