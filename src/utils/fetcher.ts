import axios from "axios";

export const api = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://194.163.167.131:8800/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const AuthAPi = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string) ??
    "http://194.163.167.131:8800/api",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export const getResError = (error?: any) => {
  if (!error) return "Something Went Wrong";
  const isNetError = error?.message?.includes("Network Error");
  if (isNetError) return "Network Error";
  return (
    error?.response?.data?.message ?? error?.message ?? "Something Went Wrong"
  );
};
