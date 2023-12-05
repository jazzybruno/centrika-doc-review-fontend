import { useAuth } from "@/contexts/AuthProvider";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  refetch: () => void;
  onClose: () => void;
}

const AddUpdateReferenceNumber: FC<Props> = ({ refetch, onClose }) => {
  const { user } = useAuth();
  const [data, setData] = React.useState({
    title: "",
    destination: "",
    status: "ACTIVE",
    createdBy: user?.id ?? "",
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !data.title.trim() ||
      !data.destination.trim() ||
      !data.status.trim() ||
      !data.createdBy.trim()
    ) {
      notifications.show({
        title: "Add Reference Number Failed",
        message: "Please fill all required fields",
        color: "red",
        autoClose: 3000,
      });
      return;
    }
    setLoading(true);
    console.log("data", data);
    try {
      const res = await AuthAPi.post("/reference-numbers/create", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Add Reference Number Success",
          message: "Add Reference Number Success",
          color: "green",
          autoClose: 3000,
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Add Reference Number Failed",
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
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper w={"100%"} label="Title" description="Title">
          <Input
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            placeholder="Title"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Destination" description="Destination">
          <Input
            onChange={(e) =>
              setData((prev) => ({ ...prev, destination: e.target.value }))
            }
            required
            placeholder="Destination"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
      </div>
      <Button
        type="submit"
        radius="md"
        loading={loading}
        disabled={loading}
        w={"100%"}
        size="md"
        mt={8}
        className=" w-full bg-primary text-white"
      >
        Add Reference Number
      </Button>
    </form>
  );
};

export default AddUpdateReferenceNumber;
