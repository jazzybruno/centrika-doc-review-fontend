import { Avatar, Divider } from "@mantine/core";

const ViewUser = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-y-2">
        <Avatar
          size={"xl"}
          src={"https://avatars.githubusercontent.com/u/55942632?v=4"}
        />
        <div className="flex w-full flex-col">
          <p className="text-lg font-semibold ">Cedrick</p>
          <p className=" opacity-80">Cedrick</p>
        </div>
      </div>
      <Divider w={'100%'} my={"md"} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Contact Info</h1>
      </div>
    </div>
  );
};

export default ViewUser;
