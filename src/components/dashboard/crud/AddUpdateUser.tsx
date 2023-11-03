import AsyncSelect from "@/components/core/AsyncSelect";
import { IUser } from "@/types/user.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";
import { BsFillCameraFill } from "react-icons/bs";

interface Props {
  refetch: () => void;
  onClose: () => void;
  isEdit?: boolean;
  user?: IUser | null;
}

const AddUpdateUser: FC<Props> = ({ refetch, onClose, isEdit, user }) => {
  const [data, setData] = React.useState({
    username: user?.username ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    email: user?.email ?? "",
    gender: user?.gender ?? "",
    // registrationCode: "",
    password: "",
    departmentId: user?.department?.id ?? "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (Object.values(data).some((val) => !val.trim())) {
      setError("Please fill all required fields");
      return;
    }
    try {
      const res = await AuthAPi.post("/users/create", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Add User Success",
          message: "Add User Success",
          color: "green",
          autoClose: 3000,
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Add User Failed",
        message: getResError(error),
        color: "red",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" w-full flex-col flex gap-y-4 py-4 items-center"
    >
      <input type="file" id="photo" hidden />
      <label
        htmlFor="photo"
        className=" cursor-pointer w-32 aspect-square bg-foreground rounded-full flex justify-center items-center"
      >
        <BsFillCameraFill size={25} />
      </label>
      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="Username"
          description="Username for the user"
        >
          <Input
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
            value={data.username}
            placeholder="Username"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Phone Number"
          description="Phone Number"
        >
          <Input
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            required
            value={data.phoneNumber}
            type="tel"
            placeholder="Phone Number"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Your Email" description="Email">
          <Input
            type="email"
            required
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Password" description="Password">
          <Input
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            required
            placeholder="Password"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Your Gender" description="Gender">
          <Select
            mt={6}
            defaultValue={data.gender}
            data={["MALE", "FEMALE"]}
            onChange={(val) => {
              if (!val) return;
              setData({ ...data, gender: val });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Department" description="Department">
          <AsyncSelect
            dataUrl="/department/all"
            value={data.departmentId}
            onChange={(val) => {
              console.log(val);
              if (!val) return;
              setData({ ...data, departmentId: val });
            }}
          />
        </Input.Wrapper>
      </div>
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        radius="md"
        w={"100%"}
        size="md"
        mt={8}
        className=" w-full bg-primary text-white"
      >
        {isEdit ? "Update User" : "Add User"}
      </Button>
    </form>
  );
};

export default AddUpdateUser;
