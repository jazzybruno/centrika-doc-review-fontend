import { useAuth } from "@/contexts/AuthProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Input, InputWrapper } from "@mantine/core";
import React from "react";

const AccountIndex = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col items-center">
        <div className=" border-mainblue border-2 rounded-full mt-11">
          <img
            className=" rounded-full w-40"
            src={`https://ui-avatars.com/api/?name=${user?.username}+${user?.email}&bold=true`}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full items-center mt-5 mx-auto max-w-[800px]">
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <InputWrapper label="Username" description="Username for the user">
              <Input value={user?.username} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Email" description="Email">
              <Input value={user?.email} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Phone Number" description="Phone Number">
              <Input value={user?.phoneNumber} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Department" description="Department">
              <Input value={user?.department?.name} disabled type={"text"} />
            </InputWrapper>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountIndex;
