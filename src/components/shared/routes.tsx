import { MenuSquareIcon, Nut, UserCircleIcon } from "lucide-react";
import { BiBell } from "react-icons/bi";
import { FaFile, FaUsers } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";

interface Route {
  icon: any;
  name: string;
  path: string;
  isPublic?: boolean;
}

export const AdminRoutes: Route[] = [
  {
    icon: <FaUsers size={20} />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <MenuSquareIcon className="w-5" />,
    name: "Departments",
    path: "/departments",
  },
  {
    icon: <FaFile siz />,
    name: "Documents",
    path: "/documents",
  },
  {
    icon: <MdNumbers size={20} />,
    name: "Reference Number",
    path: "/reference",
    isPublic: true,
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

export const deptHeadRoutes = [
  {
    icon: <FaUsers size={20} />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <FaFile />,
    name: "Documents",
    path: "/user/documents",
  },
  // {
  //   icon: <MenuSquareIcon className="w-5" />,
  //   name: "Department",
  //   path: "/departments",
  // },
  ...AdminRoutes.filter((route) => route.isPublic),
];
