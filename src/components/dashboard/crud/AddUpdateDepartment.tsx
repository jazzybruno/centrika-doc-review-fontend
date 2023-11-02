import { Button, Input, Select } from "@mantine/core";
import React from "react";
import { BsFillCameraFill } from "react-icons/bs";

const AddUpdateDepartment = () => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    department: "",
  });
  return (
    <form className=" w-full flex-col flex gap-y-4 py-4 items-center">
      <input type="file" id="photo" hidden />
      <label
        htmlFor="photo"
        className=" w-32 aspect-square bg-foreground rounded-full flex justify-center items-center"
      >
        <BsFillCameraFill size={25} />
      </label>
      <div className="flex mt-5 w-full flex-col gap-y-4">
        <Input.Wrapper
          w={"100%"}
          label="Your First Name"
          description="First Name"
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
        <Input.Wrapper w={"100%"} label="Your Email" description="Email">
          <Input
            required
            placeholder="Email"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper
          w={"100%"}
          label="Your Phone Number"
          description="Phone Number"
        >
          <Input
            required
            placeholder="Phone Number"
            p={2}
            variant="filled"
            size="md"
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Your Gender" description="Gender">
          <Select
            mt={6}
            data={["MALE", "FEMALE"]}
            onChange={(val) => {
              if (!val) return;
              setData({ ...data, gender: val });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper w={"100%"} label="Department" description="Department">
          <Select
            mt={6}
            data={["MALE", "FEMALE"]}
            onChange={(val) => {
              if (!val) return;
              setData({ ...data, gender: val });
            }}
          />
        </Input.Wrapper>
      </div>
      <Button
        type="submit"
        radius="md"
        w={'100%'}
        size="md"
        mt={8}
        className=" w-full bg-primary text-white">
            Add Customer
        </Button>
    </form>
  );
};

export default AddUpdateDepartment;
