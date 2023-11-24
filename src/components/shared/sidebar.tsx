"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { ActionIcon, Avatar, Badge } from "@mantine/core";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./routes";
import { useApp } from "@/contexts/AppProvider";

const Sidebar = () => {
  const [path, setPath] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();
  const pathname = useLocation().pathname;
  const { unreadNotifications } = useApp();

  useEffect(() => {
    setPath(pathname);
    setShowSidebar(false);
  }, [pathname]);

  // 2md = 900px
  useEffect(() => {
    const listener = () => {
      if (window.innerWidth > 900) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const routes = user?.roles[0].roleName === "ADMIN" ? AdminRoutes : UserRoutes;

  return (
    <>
      <button
        onClick={() => setShowSidebar((prev) => !prev)}
        className="absolute z-[55] 2md:hidden left-2 top-8"
      >
        {showSidebar ? <MenuIcon size={18} /> : <MenuIcon size={18} />}
      </button>
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed 2md:hidden top-0 left-0 w-full h-screen bg-black/50 z-40"
        ></div>
      )}
      <div
        className={`w-[220px] z-50 duration-500 fixed ${
          showSidebar ? "left-0" : "2md:left-0 -left-[1000px]"
        } top-0 bg-white h-screen flex gap-y-3 flex-col justify-between py-6`}
      >
        <div className="flex w-full flex-col gap-5">
          <div
            className={
              "flex gap-3 font-montserrat items-center text-2xl justify-center "
            }
          >
            <img src={"/Logo.png"} width={40} height={40} alt="Logo" />
            Base
          </div>
          <div className="flex gap-y-0.5 flex-col w-full">
            {routes.map((route, index) => {
              const isNotifyPath = route.path === "/notifications";
              return (
                <Link
                  to={route.path}
                  key={index}
                  className="flex side-link duration-150 cursor-pointer items-center gap-x-3 pr-3"
                >
                  {/* <span
                    className={`${
                      path === route.path ? "bg-primary" : ""
                    } w-1 duration-300 h-7 rounded-r-lg`}
                  ></span> */}
                  <div
                    className={`flex duration-300 items-center justify-start w-full px-4 py-2.5 ${
                      path === route.path ? "from-primary/50 bg-gradient-to-r to-white text-primary" : ""
                    }`}
                  >
                    {route.icon}
                    <span className="ml-3 font-[600] whitespace-nowrap text-sm">
                      {route.name}
                    </span>
                    {isNotifyPath && unreadNotifications?.length > 0 && (
                      <span className=" w-4 text-xs flex items-center justify-center ml-auto rounded-full aspect-square bg-red-500 text-white">
                        {unreadNotifications?.length}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-y-3 w-full">
          <img
            src={"/images/side-banner.svg"}
            width={220}
            height={220}
            alt="Banner"
            className="rounded-md object-cover w-full"
          />
          <div className="flex w-full items-center justify-between hover:bg-[#FAFAFB] p-2 rounded-md gap-x-3">
            <Link to={"/account"} className="flex flex-1 gap-3 items-center">
              <Avatar src={"/Logo.png"} size={40} radius={"md"} />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{user?.username}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[9em]">
                  {user?.email}
                </span>
              </div>
            </Link>
            <ActionIcon
              variant="transparent"
              onClick={logout}
              className="flex py-2.5 hover:text-primary rounded-md duration-300 items-center gap-3 px-6 hover:bg-accent"
            >
              <LogOutIcon size={20} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
