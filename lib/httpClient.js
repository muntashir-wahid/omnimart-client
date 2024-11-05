import { removeAuthTokens } from "@/actions/cookieActions";
import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

httpClient.interceptors.response.use(
  function (response) {
    return response.data;
  }
  // function (error) {
  //   removeAuthTokens();
  //   return Promise.reject(error.response);
  // }
);

export default httpClient;
