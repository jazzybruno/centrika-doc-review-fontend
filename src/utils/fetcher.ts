import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getResError = (error?: any) => {
    if (!error) return 'Something Went Wrong';
    const isNetError = error?.message?.includes('Network Error');
    if (isNetError) return 'Network Error';
    return error?.response?.data?.message ?? error?.message ?? 'Something Went Wrong';
  };
  