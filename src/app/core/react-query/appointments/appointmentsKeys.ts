import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "@/app/axios/api-axios-instance";

export const appointmentsKeys = createQueryKeys("appointments", {
  allAppointments: () => {
    return {
      queryKey: ["appointments"],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get("/appointments");
        return data;
      },
    };
  },
  // oneAppointment: ({ id }) => {
  //   return {
  //     queryKey: [id],
  //     queryFn: async () => {
  //       const { data } = await APIAxiosInstance.get(`/users/${id}`);
  //       return data;
  //     },
  //   };
  // },
});

export const appointmentsMutationsKeys = createMutationKeys("appointments", {
  deleteUser: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["deleteAppointment"]) => {
      const { data } = await APIAxiosInstance.delete(`/users/${payload.id}`);
      return data;
    },
  },
  // updateUser: {
  //   mutationKey: null,
  //   mutationFn: async ({
  //     userId,
  //     ...rest
  //   }: RequestTypes["updateAppointment"]) => {
  //     const { data } = await APIAxiosInstance.put(`/users/${userId}`, rest);

  //     return data;
  //   },
  // },
  createAppointment: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["createAppointment"]) => {
      const { data } = await APIAxiosInstance.post(`/appointments`, payload);
      return data;
    },
  },
});
