"use client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { Button, Input } from "@mantine/core";
import AuthLayout from "@/layouts/AuthLayout";
import { api, getResError } from "@/utils/fetcher";
import MainModal from "@/components/core/MainModal";

const VerifyCode = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("resetEmail")!);
    setEmail(email);
  }, []);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { code } = useParams();

  if (!code) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await api.put("/auth/reset-password", {
        email: email,
        newPassword: data.password,
      });
      setSuccess(true);
      notifications.show({
        title: "Password reset",
        message: "Password has been reset successfully",
        color: "green",
      });
      console.log(res);
    } catch (error) {
      const resErr = getResError(error);
      notifications.show({
        title: "Password reset failed!",
        message: resErr,
        color: "red",
      });
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex w-full gap-y-3 flex-col">
        <h2 className=" font-bold text-xl opacity-80 text-center">
          Reset Password
        </h2>
        <span className="text-sm text-gray-500 text-center">
          Enter your new password and confirm it to reset your password
        </span>
        <Input.Wrapper label="Password" required>
          <Input
            type="password"
            error={error}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="new-password"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Confirm Password" required>
          <Input
            type="password"
            error={error}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            autoComplete="new-password"
          />
        </Input.Wrapper>
        <Button type="submit" className="" size="lg">
          Submit
        </Button>
      </form>
      <div className="flex mt-6 items-center text-black gap-x-3 ">
        <span>Remember your password?</span>
        <Link to="/auth/login" className=" text-mainPurple font-semibold">
          Login
        </Link>
      </div>
      {success && (
        <MainModal
          closeOnClickOutside
          onClose={() => navigate("/auth/login")}
          isOpen={success}
        >
          <div className="flex flex-col gap-y-2 items-center">
            <h2 className=" font-bold text-xl opacity-80 text-center">
              Password Reset
            </h2>
            <span className="text-sm text-gray-500 text-center">
              Your password has been reseted successfully
            </span>
            <Link
              to="/auth/login"
              // onClick={handleNext}
              className="bg-mainPurple hover:bg-purple-950 mt-4 duration-300 text-white rounded-[4em] w-fit px-8 py-3 mx-auto"
            >
              Go To Login
            </Link>
          </div>
        </MainModal>
      )}
    </AuthLayout>
  );
};

export default VerifyCode;
