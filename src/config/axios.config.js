import axios from "axios";

const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default axiosFetch;
