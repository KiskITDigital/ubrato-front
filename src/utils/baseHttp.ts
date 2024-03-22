import axios from "axios";
import { SERVER_URI } from "./serverURI";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URI
})
