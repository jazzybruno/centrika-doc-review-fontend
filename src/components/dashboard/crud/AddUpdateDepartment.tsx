import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  refetch: () => void;
  onClose: () => void;
}

const AddUpdateDepartment: FC<Props> = ({ refetch, onClose }) => {
  const [data, setData] = React.useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.name.trim() || !data.description.trim()) {
      notifications.show({
        title: "Add Department Failed",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }
    setLoading(true);
    console.log("data", data);
    try {
      const res = await AuthAPi.post("/department/create", data);
      console.log(res);
      if (res.data) {
        notifications.show({
          title: "Add Department Success",
          message: "Add Department Success",
          color: "green",
        });
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Add Department Failed",
        message: getResError(error),
        color: "red",
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
        <Input.Wrapper
          w={"100%"}
          label="Department Name"
          description="Department Name"
        >
          <Input
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            placeholder="Name"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Department Description"
          description="Department Description"
        >
          <Textarea
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            placeholder="Description"
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
        Add Department
      </Button>
    </form>
  );
};

export default AddUpdateDepartment;
