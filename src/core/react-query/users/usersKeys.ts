import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "src/axios/api-axios-instance";

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
  validateUser: ({ payload }) => {
    return {
      queryKey: ["validateUser"],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get("/users", payload);
        return data;
      },
    };
  },
});

export const usersMutationsKeys = createMutationKeys("users", {
  deleteUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["deleteUser"]) => {
      const { data } = await APIAxiosInstance.delete(
        `/users/${payload.userId}`
      );
      return data;
    },
  },
  updateUser: {
    mutationKey: null,
    mutationFn: async ({ userId, ...rest }: RequestTypes["updateUser"]) => {
      const { data } = await APIAxiosInstance.put(`/users/${userId}`, rest);

      return data;
    },
  },
  signUpUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["signUpUser"]) => {
      const { data } = await APIAxiosInstance.post(`/users/sign-up`, payload);
      return data;
    },
  },
  signInUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["signInUser"]) => {
      const { data } = await APIAxiosInstance.post(`/users/sign-in`, payload);
      return data;
    },
  },
});
