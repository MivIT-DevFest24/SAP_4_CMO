import { getAccessToken } from "@/context/accessToken";
export let axiosInstance = axios.create();

import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const createAxiosInstance = () => {
  axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
createAxiosInstance();
