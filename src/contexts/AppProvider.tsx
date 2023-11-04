/* eslint-disable react-refresh/only-export-components */
import { INotification } from "@/types/base.type";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React, { useContext, useEffect } from "react";

interface AppContextProps {
  showRight: boolean;
  setShowRight: (show: boolean) => void;
  notifications: INotification[];
  setNotifications: (notifications: any) => void;
  unreadNotifications: INotification[];
  setUnreadNotifications: (notifications: any) => void;
}

const AppContext = React.createContext<AppContextProps>({
  showRight: false,
  setShowRight: () => {},
  notifications: [],
  setNotifications: () => {},
  unreadNotifications: [],
  setUnreadNotifications: () => {},
});

export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [showRight, setShowRight] = React.useState(false);
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = React.useState<
    INotification[]
  >([]);

  useEffect(() => {
    const unread = notifications.filter((item) => !item.read);
    setUnreadNotifications(unread);
  }, [notifications]);

  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#605BFF",
            "#14106d",
            "#C50E82",
            "#AD1374",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <Notifications position="top-right" />
      <AppContext.Provider
        value={{
          showRight,
          setShowRight,
          notifications,
          setNotifications,
          unreadNotifications,
          setUnreadNotifications,
        }}
      >
        {children}
      </AppContext.Provider>
    </MantineProvider>
  );
};

export default AppProvider;
