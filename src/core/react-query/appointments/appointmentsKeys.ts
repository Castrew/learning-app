import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import { RequestTypes } from "./requestTypes";
import { APIAxiosInstance } from "src/axios/api-axios-instance";

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
  paginatedAppointments: ({
    page,
    pageSize,
  }: RequestTypes["paginatedAppointments"]) => {
    return {
      queryKey: [page],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(
          `/appointments?page=${page}&pageSize=${pageSize}`
        );
        return data;
      },
    };
  },
  userAppointments: ({ userId }: RequestTypes["getUserAppointments"]) => {
    return {
      queryKey: [userId],
      queryFn: async () => {
        const { data } = await APIAxiosInstance.get(
          `/appointments?userId=${userId}`
        );
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
  deleteAppointment: {
    mutationKey: null,
    mutationFn: async ({ apptId }: RequestTypes["deleteAppointmentGroup"]) => {
      console.log(apptId);

      const { data } = await APIAxiosInstance.delete(`/appointments/${apptId}`);
      return data;
    },
  },
  updateAppointment: {
    mutationKey: null,
    mutationFn: async ({
      apptId,
      ...rest
    }: RequestTypes["updateAppointment"]) => {
      const { data } = await APIAxiosInstance.put(
        `/appointments/${apptId}`,
        rest
      );

      return data;
    },
  },
  createAppointment: {
    mutationKey: null,
    mutationFn: async (payload: RequestTypes["createAppointment"]) => {
      const { data } = await APIAxiosInstance.post(`/appointments`, payload);
      return data;
    },
  },
});
