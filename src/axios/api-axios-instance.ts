import axios from "axios";

const API_ROUTE = "/api";

const APIAxiosInstance = axios.create({ baseURL: API_ROUTE });

export { APIAxiosInstance };
