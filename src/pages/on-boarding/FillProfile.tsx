import AuthLayout from "@/layouts/AuthLayout";
import SetupPassword from "@/pages/on-boarding/SetupPassword.tsx";
import { api, getResError } from "@/utils/fetcher";
import { Button, Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const FillProfile = () => {
  const [data, setData] = useState({
    username: "",
    dateOfBirth: new Date().toISOString(),
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    lastName: "",
    nationalId: "",
    firstName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    nationalId: "",
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  });
  const [_error, _setError] = useState("");
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [_email, setEmail] = useState("");
  const email = searchParams.get("email");
  const [step, setStep] = useState(1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/create-invite-user", {
        ...data,
        email,
      });
      console.log(res.data);
      notifications.show({
        title: "Success",
        message: "Account created successfully",
        color: "green",
      });
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      setError(getResError(error));
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
    }
    setLoading(false);
  };

  const onEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!_email.trim()) {
      setError({ ...error, email: "Email is required" });
      return;
    }
    _setSearchParams({ email: _email });
  };

  const onProfDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    _setError("");
    if (!email?.trim()) {
      _setError("Email is required");
      setError({ ...error, email: "Email is required" });
      return;
    }
    console.log("_data", data, step);
    setStep(3);
  };

  const handlePrev = () => {
    if (step === 3) {
      setStep(2);
      return;
    }
    if (step === 2 || email) {
      navigate("/on-boarding/fill-profile");
      return;
    }
  };

  return (
    <AuthLayout>
      {
        <div className=" flex flex-col w-full">
          {email && (
            <p
              onClick={handlePrev}
              className=" text-sm cursor-pointer text-primary"
            >
              &larr; Back
            </p>
          )}
          <h1 className=" text-3xl font-semibold text-blue">Fill profile</h1>
          <span className=" opacity-75">
            Please fill your profile to continue
          </span>
          {!email ? (
            <form
              onSubmit={onEmailSubmit}
              className=" mt-8 flex flex-col gap-y-3"
            >
              <Input.Wrapper label="Email" required error={error.email}>
                <Input
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
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
          ) : step === 3 ? (
            <SetupPassword
              onSubmit={onSubmit}
              setStep={setStep}
              setPassword={(val: any) => setData({ ...data, password: val })}
            />
          ) : step === 2 || email ? (
            <form
              onSubmit={onProfDataSubmit}
              className=" mt-8 flex flex-col gap-y-6"
            >
              {_error && <span className=" text-red-500">{_error}</span>}
              <div className="flex items-end justify-between">
                <Input.Wrapper error={error.firstName} label="First Name">
                  <Input
                    error={error.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                    value={data.firstName}
                  />
                </Input.Wrapper>
                <Input.Wrapper error={error.lastName} label="Last Name">
                  <Input
                    error={error.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                    value={data.lastName}
                  />
                </Input.Wrapper>
              </div>
              <Input.Wrapper error={error.email} label="Email">
                <Input
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  value={data.username}
                />
              </Input.Wrapper>
              <Input.Wrapper error={error.gender} label="Gender">
                <Select
                  value={data.gender}
                  data={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    {
                      value: "OTHER",
                      label: "Other",
                    },
                  ]}
                  placeholder={"Enter your gender"}
                  px={3}
                  // variant="unstyled"
                  width="100%"
                  className=" w-full"
                  onChange={(val) => val && setData({ ...data, gender: val })}
                />
              </Input.Wrapper>
              <Input.Wrapper error={error.phoneNumber} label="Phone Number">
                <Input
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  value={data.phoneNumber}
                />
              </Input.Wrapper>
              <Input.Wrapper error={error.nationalId} label="National ID">
                <Input
                  onChange={(e) =>
                    setData({ ...data, nationalId: e.target.value })
                  }
                  value={data.nationalId}
                />
              </Input.Wrapper>
              <Input.Wrapper error={error.dateOfBirth} label="Date of Birth">
                <DateInput
                  placeholder="Date of Birth"
                  value={new Date(data.dateOfBirth)}
                  onChange={(val) =>
                    val && setData({ ...data, dateOfBirth: val.toISOString() })
                  }
                />
              </Input.Wrapper>
              <Button
                loading={loading}
                disabled={loading}
                type="submit"
                className=""
                size="lg"
              >
                Next
              </Button>
            </form>
          ) : null}
          <div className={"flex items-center justify-end mt-"}>
            <Link
              to="/auth/login"
              className=" text-primary hover:text-blue-900 duration-300 text-sm mt-3 ml-auto"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      }
    </AuthLayout>
  );
};

export default FillProfile;
