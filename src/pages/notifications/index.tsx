import useNotification from "@/hooks/useNotification";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const NotificationPage = () => {
    const { getNotifications, markAllAsRead, readNotification, notifications, loading, error} = useNotification();
    const [filter, setFilter] = React.useState("all");
    const [filteredList, setFilteredList] = React.useState(notifications);
  return (
    <DashboardLayout>
      <div className=" 2md:px-6 px-3 flex flex-col w-full gap-y-3">NotificationPage</div>
    </DashboardLayout>
  );
};

export default NotificationPage;
