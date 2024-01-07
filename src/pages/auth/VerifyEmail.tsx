"use client";
import { api, getResError } from "@/utils/fetcher";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { ClipLoader, RiseLoader } from "react-spinners";

const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null as any);
  const [success, setSuccess] = React.useState(null as any);
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  useEffect(() => {
    if (!email || !code) {
      setLoading(false);
      setError("Invalid verification link");
      return;
    }
    const verifyEmail = async () => {
      setLoading(true);
      try {
        const res = await api.post(
          "/auth/verify-account",
          {},
          {
            params: {
              email,
              code,
            },
          }
        );
        setSuccess(
          res?.data.data?.message ??
            "Email verified successfully. Check email for password"
        );
      } catch (error) {
        console.log(error);
        setError(getResError(error) + " or invalid verification link");
      }
      setLoading(false);
    };
    verifyEmail();
  }, [code, email]);

  return (
    <div className="w-full flex-col flex h-screen items-center justify-center">
      {loading && (
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src="/Logo.png"
            className="w-22 h-22 object-cover"
            alt="DMS Logo"
          />
          <ClipLoader color={"#605BFF"} />
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      {success && (
        <div className="flex flex-col justify-center items-center w-full">
          <FaCheckCircle className=" text-9xl text-green-500" />
          <div className="text-green-500">{success}</div>
          <Link
            className=" bg-primary mt-5 px-7 text-white py-2 rounded-3xl"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
