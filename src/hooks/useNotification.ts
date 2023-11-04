import { useApp } from "@/contexts/AppProvider";
import { useAuth } from "@/contexts/AuthProvider";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { useState } from "react";

export default function useNotification() {
  const { notifications, setNotifications, unreadNotifications } = useApp();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthAPi.get(`/notifications/user/${user?.id}`);
      const data = await res.data;
      console.log("getNotifications", data);
      setNotifications(data.data);
    } catch (error: any) {
      console.log("getNotifications error", error);
      setError(getResError(error));
    } finally {
      setLoading(false);
    }
  };

  const readNotification = async (id: string) => {
    setError(null);
    try {
      const res = await AuthAPi.put(`/notifications/mark-as-read/${id}`);
      const data = await res.data;
      console.log("readNotification", data);
      //   setNotifications(data.data);
      getNotifications();
    } catch (error: any) {
      console.log("readNotification error", error);
      setError(getResError(error));
    }
  };

  const markAllAsRead = async () => {
    setError(null);
    try {
      const res = await AuthAPi.put(
        `/notifications/user/mark-as-read/all/${user?.id}`
      );
      const data = await res.data;
      console.log("markAllAsRead", data);
      //   setNotifications(data.data);
      getNotifications();
    } catch (error: any) {
      console.log("markAllAsRead error", error);
      setError(getResError(error));
    }
  };

  const deleteNotification = async (id: string) => {
    setError(null);
    try {
      const res = await AuthAPi.delete(`/notifications/${id}`);
      const data = await res.data;
      console.log("deleteNotification", data);
      //   setNotifications(data.data);
      getNotifications();
    } catch (error: any) {
      console.log("deleteNotification error", error);
      setError(getResError(error));
    }
  };

  return {
    loading,
    error,
    getNotifications,
    readNotification,
    notifications,
    markAllAsRead,
    setNotifications,
    deleteNotification,
    unreadNotifications,
  };
}
