import AsyncSelect from "@/components/core/AsyncSelect";
import UploadArea from "@/components/core/UploadArea";
import { Button, Input, Select } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import React from "react";

const AddUpdateDocument = () => {
  const [data, setData] = React.useState({
    fileName: "",
    referenceNumber: "",
    receiverName: "",
    department: "",
  });
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (files: File[]) => {
    console.log(files);
    setFile(files[0]);
  };

  return (
    <form className=" w-full flex-col flex gap-y-4 py-4 items-center">
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
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="Your File Name"
          description="File Name"
        >
          <Input required placeholder="Name" p={2} variant="filled" size="md" />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Your Last Name"
          description="Last Name"
        >
          <Input required placeholder="Name" p={2} variant="filled" size="md" />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Reference Number "
          description="Reference Number"
        >
          <Input
            required
            placeholder="Reference Number"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Receiver Name"
          description="Receiver Name"
        >
          <AsyncSelect
            dataUrl="/department/all"
            onChange={(val) => {
              console.log(val);
              if (!val) return;
              setData({ ...data, receiverName: val });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Department" description="Department">
          <AsyncSelect
            dataUrl="/department/all"
            onChange={(val) => {
              console.log(val);
              if (!val) return;
              setData({ ...data, department: val });
            }}
          />
        </Input.Wrapper>
      </div>
      <Button
        type="submit"
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
