import AsyncSelect from "@/components/core/AsyncSelect";
import UploadArea from "@/components/core/UploadArea";
import { useAuth } from "@/contexts/AuthProvider";
import { ERelated, IDocument, IDocumentReview } from "@/types/base.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select, Switch, Textarea } from "@mantine/core";
import {
  PDF_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MS_WORD_MIME_TYPE,
} from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  refetch: () => void;
  onClose: () => void;
  data?: IDocument | null;
  isEdit?: boolean;
}

const AddUpdateDocument: FC<Props> = ({
  refetch,
  onClose,
  data: toUpdate,
  isEdit,
}) => {
  const { user } = useAuth();
  const currentDocument = toUpdate;
  const [data, setData] = React.useState({
    title: currentDocument?.title ?? "",
    // reviewer: toUpdate?.reviewers[0]?.id ?? "",
    referenceNumberId: currentDocument?.referenceNumber?.id ?? "",
    relationshipType: "",
    parentDocumentId: "",
    category: currentDocument?.category ?? "",
    description: currentDocument?.description ?? "",
    creator: user?.id ?? "",
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [hasPrevDoc, setHasPrevDoc] = React.useState(false);

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
    formData.append("docFile", file);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    // formData.append("departmentId", data?.departmentId);
    formData.append("creator", data.creator);
    formData.append("relationType", data.relationshipType);
    formData.append("referenceNumberId", data.referenceNumberId);
    formData.append("parentDocumentId", data.parentDocumentId);
    formData.append(
      "isRelated",
      hasPrevDoc ? ERelated.RELATED : ERelated.NOT_RELATED
    );

    try {
      const response = isEdit
        ? await AuthAPi.put(`/documents/${toUpdate?.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await AuthAPi.post("/documents/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      // Handle the response
      console.log(response);
      if (response.status === 200) {
        notifications.show({
          title: `${
            isEdit ? "Update Document Success" : "Add Document Success"
          }`,
          message: `${
            isEdit ? "Update Document Success" : "Add Document Success"
          }`,
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
        accept={{
          PDF_MIME_TYPE,
          MS_WORD_MIME_TYPE,
          MS_POWERPOINT_MIME_TYPE,
          MS_EXCEL_MIME_TYPE,
        }}
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
        {data.category === "EXTERNAL" && (
          <Input.Wrapper
            w={"100%"}
            label="Reference Number"
            description="Reference Number"
          >
            <AsyncSelect
              selectDataUrl={`/reference-numbers/by-user/${user?.id}`}
              value={data.referenceNumberId}
              onChange={(val) => {
                console.log(val);
                if (!val) return;
                setData({ ...data, referenceNumberId: val });
              }}
              labelKey="referenceNumber"
            />
          </Input.Wrapper>
        )}
        <div className="flex justify-between items-center">
          <span>Does it have a previous document?</span>
          <Switch
            checked={hasPrevDoc}
            onChange={() => setHasPrevDoc((prev) => !prev)}
          />
        </div>
        {hasPrevDoc && (
          <>
            <Input.Wrapper
              label="Relationship"
              description="Relationship with previous document"
            >
              <Select
                mt={6}
                defaultValue={data.relationshipType}
                data={["VERSION", "RESPONSE"]}
                onChange={(val) => {
                  if (!val) return;
                  setData({ ...data, relationshipType: val });
                }}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Select Document">
              <AsyncSelect
                selectDataUrl={`/documents/by-user/${user?.id}`}
                value={data.parentDocumentId}
                onChange={(val) => {
                  console.log(val);
                  if (!val) return;
                  setData({ ...data, parentDocumentId: val });
                }}
                labelKey="title"
              />
            </Input.Wrapper>
          </>
        )}
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
        {isEdit ? "Update Document" : "Upload Document"}
      </Button>
    </form>
  );
};

export default AddUpdateDocument;
