import { IUser } from "@/types/user.type";
import { Avatar, Divider } from "@mantine/core";
import { FC } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

interface Props {
  user: IUser | null;
}

const ViewUser: FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-col p-3 items-center w-full">
      <div className="flex flex-col gap-y-2">
        <Avatar
          size={"xl"}
          src={"https://avatars.githubusercontent.com/u/55942632?v=4"}
        />
        <div className="flex w-full flex-col">
          <p className="text-lg font-semibold ">{user?.username}</p>
          <p className=" opacity-80">{user?.department?.name}</p>
        </div>
      </div>
      <Divider w={"100%"} my={"md"} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold text-lg">Contact Info</h1>
        <div className="flex flex-col gap-y-2 text-slate-500 w-full">
          <div className="flex items-center gap-x-2">
            <FaEnvelope />
            <p>{user?.email}</p>
          </div>
          <Divider w={'100%'} />
          <div className="flex items-center gap-x-2">
            <FaPhoneAlt />
            <p>{user?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
