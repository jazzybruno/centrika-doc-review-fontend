import { useAuth } from "@/contexts/AuthProvider";
import useNotification from "@/hooks/useNotification";
import DashboardLayout from "@/layouts/DashboardLayout";
import { humanizeDate } from "@/utils/funcs";
import { ActionIcon, SegmentedControl, Skeleton } from "@mantine/core";
import React, { useEffect } from "react";
import { BiTrash } from "react-icons/bi";

const NotificationPage = () => {
  const {
    getNotifications,
    markAllAsRead,
    readNotification,
    notifications,
    loading,
    deleteNotification,
    error,
    setNotifications,
  } = useNotification();
  const { user } = useAuth();
  const [filter, setFilter] = React.useState("all");
  const [filteredList, setFilteredList] = React.useState(notifications);

  const skeletonData = new Array(10).fill({
    title: "",
    body: "",
    read: false,
    createdAt: "",
    updatedAt: "",
  });

  const filterData = (filter: string) => {
    switch (filter) {
      case "all":
        setFilteredList(notifications);
        break;
      case "read":
        setFilteredList(notifications.filter((item) => item.read));
        break;
      case "unread":
        setFilteredList(notifications.filter((item) => !item.read));
        break;
      default:
        setFilteredList(notifications);
        break;
    }
  };

  useEffect(() => {
    filterData(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (!user) return;
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!notifications) return;
    setFilteredList(notifications);
  }, [notifications]);
  return (
    <DashboardLayout>
      <div className=" 2md:px-6 px-3 flex flex-col w-full gap-y-3">
        <div className="flex justify-between items-center">
          <SegmentedControl
            w={300}
            onChange={(value) => setFilter(value)}
            data={[
              { value: "all", label: "All" },
              { value: "unread", label: "Unread" },
              { value: "read", label: "Read" },
            ]}
          />
          <button
            onClick={() => markAllAsRead()}
            className="text-sm text-primary"
          >
            Mark All as Read
          </button>
        </div>
        <div className="flex w-full flex-col p-3">
          {loading && (
            <div className="flex w-full flex-col gap-y-4">
              {skeletonData.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  <Skeleton height={50} />
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center w-full">
              <span className="flex items-center justify-center text-red-700 text-sm">
                {error}
              </span>
            </div>
          )}
          {!loading && notifications.length === 0 ? (
            <div className="flex flex-col items-center w-full">
              <span className="flex items-center justify-center text-sm">
                No Notifications
              </span>
            </div>
          ) : !loading ? (
            <div className="flex flex-col items-center gap-y-3 w-full">
              {filteredList.reverse().map((item, index) => (
                <div
                  key={item.notId}
                  className={`flex items-center justify-between w-full p-3 rounded-lg ${
                    !item.read ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.message}</span>
                    <span className="text-sm">
                      {humanizeDate(item.createdAt)}
                    </span>
                  </div>
                  {/* read/unred */}
                  <div className="flex flex-col">
                    <button
                      onClick={
                        item.read
                          ? () => {}
                          : () => readNotification(item.notId)
                      }
                      className="text-sm text-primary"
                    >
                      {item.read ? "Read" : "Mark as Read"}
                    </button>
                    <ActionIcon
                      onClick={() => deleteNotification(item.notId)}
                      variant="transparent"
                      color="red"
                      radius="xl"
                    >
                      <BiTrash />
                    </ActionIcon>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationPage;
