import { IReferenceNumber } from "@/types/base.type";
import React, { FC } from "react";
import { Avatar, Badge, Divider } from "@mantine/core";

interface Props {
  referenceNumber: IReferenceNumber | null;
}

const ViewReferenceNumber: FC<Props> = ({ referenceNumber }) => {
  const user = referenceNumber?.createdBy;
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h1 className=" opacity-70 text-lg">{referenceNumber?.title}</h1>
      <Divider my={"md"} />
      <p>{referenceNumber?.destination}</p>
      <Divider my={"md"} />
      <div className="flex w-full gap-y-3 flex-col ">
        <div className="flex items-center justify-between text-sm font-semibold">
          <p>Status</p>
        </div>
        <Badge>{referenceNumber?.status}</Badge>
        <Divider my={"md"} />
        <p className=" font-semibold">Created By</p>
        <p>{referenceNumber?.createdBy.username}</p>
        <div className="flex w-full items-center gap-x-2">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${user?.username}+${user?.email}&bold=true`}
            size={"md"}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-primary">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReferenceNumber;
