import { Button, Input, Select, Textarea } from "@mantine/core";
import React from "react";
import { BsFillCameraFill } from "react-icons/bs";

const AddUpdateDepartment = () => {
  const [data, setData] = React.useState({
    name: "",
    description: "",
    author: "",
  });
  return (
    <form className=" w-full flex-col flex gap-y-4 py-4 items-center">
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="Department Name"
          description="Department Name"
        >
          <Input required placeholder="Name" p={2} variant="filled" size="md" />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Department Description"
          description="Department Description"
        >
          <Input required placeholder="Name" p={2} variant="filled" size="md" />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Description" description="Your Description">
          <Textarea
            required
            placeholder="Email"
            p={2}
            variant="filled"
            size="md"
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
        Add Customer
      </Button>
    </form>
  );
};

export default AddUpdateDepartment;
