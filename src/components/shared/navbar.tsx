"use client";
import { useAuth } from "@/contexts/AuthProvider";
import useNotification from "@/hooks/useNotification";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface Props {
  right?: React.ReactNode;
}

const NavBar: FC<Props> = ({ right }) => {
  const [title, setTitle] = useState("");
  const [paths, setPaths] = useState<string[]>([]);
  const pathname = useLocation().pathname;
  const { user } = useAuth();
  const { unreadNotifications } = useNotification();

  useEffect(() => {
    setTitle(
      pathname
        .split("/")
        .map((path, index) => {
          if (index === 0) return null;
          if (index === pathname.split("/").length - 1)
            return path.split("-").join(" ");
          return `${path.split("-").join(" ")} / `;
        })
        .join(",")
        .replace(/,/g, "")
    );
    // setTitle(pathname.split('/')[1].split('-').join(' '));
    setPaths(pathname.split("/"));
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>
          {unreadNotifications.length > 0
            ? `(${unreadNotifications.length})`
            : ""}{" "}
          {title} | Dashboard
        </title>
      </Helmet>
      <div className=" sticky h-[80px] bg-white  top-0 bg-accent z-10 w-full items-center flex p-5 pl-8 justify-between">
        <h1
          title={title}
          className=" capitalize font-semibold text-xl truncate"
        >
          {title}
        </h1>
        {right}
      </div>
    </>
  );
};

export default NavBar;
