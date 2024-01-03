"use client";
import { Button, Input, PinInput } from "@mantine/core";
import React, { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { notifications } from "@mantine/notifications";
import { SlRefresh } from "react-icons/sl";
import { useNavigate, useSearchParams } from "react-router-dom";
import Animated from "@/components/shared/animated";
import { api, getResError } from "@/utils/fetcher";

const ResetFormSteps = () => {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initiateReset = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        `/auth/initiate-reset-password?email=${email}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (step === 1) {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/auth/verify-reset-code?code=${code}&email=${email}`
        );
        console.log(data);
        notifications.show({
          title: "Code verified!",
          message: "Code has been verified ",
          color: "green",
        });
      } catch (err: any) {
        console.log(err);
        if (err.response.data.success == false) {
          notifications.show({
            title: "Verification Failed",
            message: err.response.data.message as string,
            color: "red",
          });
          return;
        }
      } finally {
        setLoading(false);
      }
      navigate(`/auth/reset-password/${code}`);
      return;
    }
    setStep((prev) => prev + 1);
    const params = new URLSearchParams();
    params.append("email", email);
    if (step === 0) {
      await initiateReset();
    }
    localStorage.setItem("resetEmail", JSON.stringify(email));
    navigate(`/auth/forgot-password?${params.toString()}`);
  };
  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    const email = searchParams.get("email");
    console.log(email);
    if (email) setEmail(email);
  }, [searchParams]);

  return (
    <>
      {step > 0 && (
        <BiArrowBack
          className="text-mainPurple cursor-pointer"
          onClick={handleBack}
        />
      )}
      <div className=" flex gap-y-4 flex-col w-full">
        {step === 0 && (
          <Animated className=" animate-fade-left ">
            <div className="flex flex-col gap-2">
              <Input.Wrapper label="Email" required>
                <Input
                  type="email"
                  error={error}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                />
              </Input.Wrapper>
            </div>
          </Animated>
        )}
        {step === 1 && (
          <div className=" animate-fade-left flex items-center flex-col gap-y-8">
            <span className=" text-sm opacity-80 text-center">
              Please enter the code sent to {email} to succesfuly reset your
              password
            </span>
            <PinInput
              size="lg"
              placeholder=""
              length={6}
              aria-label="One time code"
              onChange={(value) => {
                console.log(value);
                setCode(value);
              }}
            />
          </div>
        )}
        <Button
          loading={loading}
          disabled={loading}
          type="button"
          className=""
          size="lg"
          onClick={handleNext}
        >
          {loading ? (
            <SlRefresh className="animate-spin ml-2" />
          ) : step === 0 ? (
            "Send Code"
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </>
  );
};

export default ResetFormSteps;
