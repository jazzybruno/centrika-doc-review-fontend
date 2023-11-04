/* eslint-disable react-refresh/only-export-components */
import { LayoutGridIcon, MenuSquareIcon, UserCircleIcon } from "lucide-react";
import { BiBell } from "react-icons/bi";
import { FaUsers, FaFile } from "react-icons/fa";

interface Route {
  icon: any;
  name: string;
  path: string;
  isPublic?: boolean;
}

export const AdminRoutes: Route[] = [
  // {
  //   icon: <LayoutGridIcon />,
  //   name: "Dashboard",
  //   path: "/dashboard",
  // },
  {
    icon: <FaUsers />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <MenuSquareIcon />,
    name: "Departments",
    path: "/departments",
  },
  {
    icon: <FaFile siz />,
    name: "Documents",
    path: "/documents",
  },
  {
    icon: <BiBell size={20} />,
    name: "Notifications",
    path: "/notifications",
    isPublic: true,
  },
  {
    icon: <UserCircleIcon size={20} />,
    name: "Account",
    path: "/account",
    isPublic: true,
  },
];

export const UserRoutes = [
  {
    icon: <FaFile />,
    name: "Documents",
    path: "/user/documents",
  },
  ...AdminRoutes.filter((route) => route.isPublic),
];
