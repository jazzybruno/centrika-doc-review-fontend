import React from "react";
import ResetFormSteps from "./_resetPassword.tsx";
import { Link } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className=" flex flex-col w-full gap-y-1">
        <h1 className=" text-3xl font-semibold">Forgot password?</h1>
        <span className=" opacity-75">
          We are sorry to hear that, let's help you get your account.
        </span>
        <ResetFormSteps />
        <div className="flex items-center text-black gap-x-3 ">
          <span>Remember your password?</span>
          <Link to="/auth/login" className=" text-mainPurple font-semibold">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
