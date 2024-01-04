import { Button, Input, PasswordInput } from "@mantine/core";
import React, { useState } from "react";
import { CgEye } from "react-icons/cg";
import { FaEyeSlash } from "react-icons/fa";

interface SetupPasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPassword: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SetupPassword({
  setPassword,
  onSubmit,
}: SetupPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [_error, _setError] = useState("");

  const _onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.confirmPassword.trim() || !data.password.trim()) {
      _setError("Please fill all required fields");
      !data.confirmPassword.trim() &&
        setError({ ...error, confirmPassword: "Confirm password is required" });
      !data.password.trim() &&
        setError({ ...error, password: "Password is required" });
    }
    if (data.password !== data.confirmPassword) {
      setError({
        ...error,
        confirmPassword: "Confirm password must match password",
      });
      _setError("" + "passwords must match password");
      return;
    }
    setLoading(true);
    setPassword(data.password);
    await onSubmit(e);
    setLoading(false);
  };

  return (
    // <AuthLayout>
    <div className=" flex flex-col w-full">
      {/*<p onClick={()=> setStep(2)} className=" text-sm text-primary">*/}
      {/*   &larr; Back*/}
      {/*</p>*/}
      <h1 className=" text-3xl font-semibold">Set up your password</h1>
      <span className=" opacity-75">Set up password for your account</span>
      <form onSubmit={_onSubmit} className=" mt-8 flex flex-col gap-y-6">
        {_error && <span className=" text-red-500">{_error}</span>}
        <Input.Wrapper label="Password" required error={error.password}>
          <PasswordInput
            onChange={(e) => setData({ ...data, password: e.target.value })}
            // label="Password"
            required
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Confirm Password"
          required
          error={error.confirmPassword}
        >
          <PasswordInput
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
            // label="Password"
            required
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
          />
        </Input.Wrapper>
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className=""
          size="lg"
        >
          Submit
        </Button>
      </form>
    </div>
    // </AuthLayout>
  );
}
