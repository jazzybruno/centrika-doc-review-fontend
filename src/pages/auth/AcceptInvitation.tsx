"use client";
import { api, getResError } from "@/utils/fetcher";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Navigate, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AcceptInvitation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null as any);
  const [success, setSuccess] = React.useState(null as any);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      setLoading(false);
      setError("Invalid verification link");
      return;
    }
    const verifyEmail = async () => {
      setLoading(true);
      try {
        const res = await api.post(
          "/users/is-code-valid",
          {},
          {
            params: {
              email,
              token,
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
  }, [token, email]);

  return (
    <div className="w-full flex-col flex items-center">
      {loading && (
        <div className="flex flex-col justify-center items-center w-full">
          <ClipLoader color="#" />
        </div>
      )}
      {error && (
        <div className="flex flex-co523873l justify-center items-center w-full">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      {success && !loading && (
        <div className="flex flex-col justify-center items-center w-full">
          <FaCheckCircle className=" text-9xl text-green-500" />
          <div className="text-green-500">{success}</div>
          <Navigate to={`/on-boarding/fill-profile?email=${email}`} />
        </div>
      )}
    </div>
  );
};

export default AcceptInvitation;
