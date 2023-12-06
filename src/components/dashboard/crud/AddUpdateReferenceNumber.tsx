import { useAuth } from "@/contexts/AuthProvider";
import { IReferenceNumber } from "@/types/base.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  refetch: () => void;
  onClose: () => void;
  isEdit?: boolean;
  referenceNumber?: IReferenceNumber | null;
}

const AddUpdateReferenceNumber: FC<Props> = ({
  refetch,
  onClose,
  isEdit,
  referenceNumber,
}) => {
  const { user } = useAuth();
  const [data, setData] = React.useState({
    title: referenceNumber?.title ?? "",
    destination: referenceNumber?.destination ?? "",
    status: referenceNumber?.status ?? "ACTIVE",
    createdBy: referenceNumber?.createdBy.id ?? user?.id ?? "",
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

  const updateReferenceNumber = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (referenceNumber?.status !== data.status) {
        const res = await AuthAPi.put(
          `/reference-numbers/update-status/${referenceNumber?.id}?status=${data.status}`
        );
        console.log(res);
        if (res.data) {
          notifications.show({
            title: "Update Reference Number Status Success",
            message: "Update Reference Number Status Success",
            color: "green",
            autoClose: 3000,
          });
        }
      }
      if (referenceNumber?.destination !== data.destination) {
        const res = await AuthAPi.put(
          `/reference-numbers/update-destination/${referenceNumber?.id}?destination=${data.destination}`
        );
        console.log(res);
        if (res.data) {
          notifications.show({
            title: "Update Reference Number Destination Success",
            message: "Update Reference Number Destination Success",
            color: "green",
            autoClose: 3000,
          });
        }
      }
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Update Reference Number Failed",
        message: getResError(error),
        color: "red",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={isEdit ? updateReferenceNumber : onSubmit}
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
            disabled={isEdit}
            value={data.title}
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
            value={data.destination}
            disabled={isEdit}
            required
            placeholder="Destination"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        {isEdit && (
          <Select
            value={data.status}
            onChange={(e) => {
              if (!e) return;
              setData((prev) => ({ ...prev, status: e }));
            }}
            label="Status"
            placeholder="Select Status"
            required
            data={[
              { value: "ACTIVE", label: "ACTIVE" },
              { value: "INACTIVE", label: "INACTIVE" },
            ]}
            className="w-full"
          />
        )}
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
        {isEdit ? "Update Status" : "Book Reference Number"}
      </Button>
    </form>
  );
};

export default AddUpdateReferenceNumber;
