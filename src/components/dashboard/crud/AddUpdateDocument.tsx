import AsyncSelect from "@/components/core/AsyncSelect";
import UploadArea from "@/components/core/UploadArea";
import { useAuth } from "@/contexts/AuthProvider";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  refetch: () => void;
  onClose: () => void;
}

const AddUpdateDocument: FC<Props> = ({refetch, onClose}) => {
  const { user } = useAuth();
  const [data, setData] = React.useState({
    title: "",
    reviewer: "",
    departmentId: "",
    category: "",
    description: "",
    creator: user?.id ?? "",
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (files: File[]) => {
    console.log(files);
    setFile(files[0]);
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (!file) {
      setError("Please select a file");
      return;
    }
    // Append the file to the form data
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("departmentId", data.departmentId);
    formData.append("creator", data.creator);
    formData.append("reviewer", data.reviewer);

    try {
      const response = await AuthAPi.post(
        "/document-reviews/request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle the response
      console.log(response);
      if (response.status === 200) {
        notifications.show({
          title: "Add Document Success",
          message: "Add Document Success",
          color: "green",
          autoClose: 3000,
        });
        refetch();
        onClose();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Add Document Failed",
        message: getResError(error),
        color: "red",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={sendData}
      className=" w-full flex-col flex gap-y-4 py-4 items-center"
    >
      <UploadArea
        onDrop={handleFileChange}
        accept={PDF_MIME_TYPE}
        className=" h-32 flex items-center w-full justify-center bg-foreground"
      >
        {file ? (
          <div className="flex items-center gap-x-2 p-2 bg-white">
            <span className=" text-center"> {file?.name}</span>
          </div>
        ) : null}
      </UploadArea>
      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="Your File Title"
          description="File Title"
        >
          <Input
            required
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Name"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Description "
          description="Description"
        >
          <Textarea
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
            value={data.description}
            required
            placeholder="Email"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Category" description="Category">
          <Select
            mt={6}
            defaultValue={data.category}
            data={["INTERNAL", "EXTERNAL"]}
            onChange={(val) => {
              if (!val) return;
              setData({ ...data, category: val });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Department" description="Department">
          <AsyncSelect
            dataUrl="/department/all"
            onChange={(val) => {
              console.log(val);
              if (!val) return;
              setData({ ...data, departmentId: val });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Reviewer Name"
          description="Reviewer Name"
        >
          <AsyncSelect
            dataUrl={
              data.departmentId
                ? `/users/department/${data.departmentId}`
                : `/users/all`
            }
            labelKey="username"
            onChange={(val) => {
              console.log(val);
              if (!val) return;
              setData({ ...data, reviewer: val });
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
        Upload Document
      </Button>
    </form>
  );
};

export default AddUpdateDocument;
