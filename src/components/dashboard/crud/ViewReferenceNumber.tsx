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
      <div className="flex text-sm flex-col w-full">
        <div className="flex items-center gap-x-3">
          <span className=" font-semibold">Title: </span>
          <h1>{referenceNumber?.title}</h1>
        </div>
        <div className="flex items-center gap-x-3">
          <span className=" font-semibold">Destination: </span>
          <p> {referenceNumber?.destination}</p>
        </div>
        <div className="flex items-center gap-x-3">
          <span className=" font-semibold">Number: </span>
          <p> {referenceNumber?.referenceNumber}</p>
        </div>
      </div>
      <Divider my={"md"} />
      <div className="flex w-full gap-y-3 flex-col ">
        <div className="flex items-center justify-between text-sm font-semibold">
          <p>Status</p>
          <Badge color={referenceNumber?.status === "ACTIVE" ? "green" : "red"}>
            {referenceNumber?.status}
          </Badge>
        </div>
        <Divider my={"md"} />
        <div className="flex gap-y-2 flex-col">
          <p className=" font-semibold">Created By</p>
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
        <Divider my={"md"} />
        <div className="flex gap-y-2 flex-col">
          <p className=" font-semibold">Created At</p>
          <h2>{new Date(referenceNumber?.createdAt ?? "").toUTCString()}</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewReferenceNumber;
