import axios from "axios";

const API_ROUTE = "/api";

const APIAxiosInstance = axios.create({ baseURL: API_ROUTE });

APIAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (!error?.response?.status) {
      return Promise.reject(error?.message);
    }
    return Promise.reject(error.response.status);
  }
);

export { APIAxiosInstance };
