import AuthLayout from "@/layouts/AuthLayout";
import { api, getResError } from "@/utils/fetcher";
import { Button, Input } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", email);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
    }
  };

  return (
    <AuthLayout>
      <div className=" flex flex-col w-full">
        <h1 className=" text-3xl font-semibold">Forgot password?</h1>
        <span className=" opacity-75">
          We are sorry to hear that, let's help you get your account.
        </span>
        <form onSubmit={onSubmit} className=" mt-8 flex flex-col gap-y-6">
          <span className="">Enter your work email</span>
          <Input.Wrapper label="Email" required>
            <Input
              type="email"
              error={error}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input.Wrapper>
          <div className="flex justify-end items-center">
            <Link to="/forgot-password" className=" text-primary text-sm">
              Remember password ? Log in
            </Link>
          </div>
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            className=""
            size="lg"
          >
            Reset password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
