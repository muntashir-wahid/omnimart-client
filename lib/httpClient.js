import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default httpClient;
