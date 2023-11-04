import NavBar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import useNotification from "@/hooks/useNotification";
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
  children: React.ReactNode;
  right?: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children, right }) => {
  const { getNotifications } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <div className=" w-full flex min-h-screen">
        <Sidebar />
        <div className="flex w-full bg-[#FAFAFB] flex-col 2md:pl-[220px]">
          <NavBar right={right} />
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
