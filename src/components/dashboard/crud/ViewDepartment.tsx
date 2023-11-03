import { IDepartment } from "@/types/base.type";
import { Divider } from "@mantine/core";
import { FC } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
    department: IDepartment | null;
}

const ViewDepartment: FC<Props> = ({department}) => {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h1 className=" opacity-70 text-lg">{department?.name}</h1>
      <Divider my={"md"} />
      <p>
        {department?.description}
      </p>
      <Divider my={"md"} />
      <div className="flex w-full gap-y-3 flex-col ">
        <div className="flex items-center justify-between text-sm font-semibold">
            <p>Active Documents</p>
            <Link className=" text-primary" to={'/documents'}>View All</Link>
        </div>
        <div className="flex w-full items-center gap-x-2">
          <button className=" p-2 rounded-lg bg-gray-100">
            <AiFillFilePdf size={30} className="text-red-500 " />
          </button>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Document Name</p>
            <p className="text-xs text-primary">Not Checked</p>
            <p className="text-sm opacity-80">By Cedrick</p>
          </div>
        </div>
        <Divider/>
        <div className="flex w-full items-center gap-x-2">
          <button className=" p-2 rounded-lg bg-gray-100">
            <AiFillFilePdf size={30} className="text-red-500 " />
          </button>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Document Name</p>
            <p className="text-xs text-primary">Not Checked</p>
            <p className="text-sm opacity-80">By Cedrick</p>
          </div>
        </div>
      </div>
      <div className="flex text-sm flex-col gap-y-2">
        <p>Issued On</p>
        <p>2021-10-10</p>
      </div>
    </div>
  );
};

export default ViewDepartment;
