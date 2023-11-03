import { Divider } from "@mantine/core";
import React from "react";
import { AiFillFilePdf, AiOutlineCloudDownload } from "react-icons/ai";

const ViewDocument = () => {
  return (
    <div className="flex w-full flex-col gap-y-3 pt-11">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <button className=" p-2 rounded-full bg-gray-100">
            <AiFillFilePdf size={25} className="text-red-500 " />
          </button>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Document Name</p>
            <p className="text-xs text-primary">Not Checked</p>
            <p className="text-sm opacity-80">By Cedrick</p>
          </div>
        </div>
        <button className=" p-2 h-fit rounded-3xl hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary">
          <AiOutlineCloudDownload />
          Download
        </button>
      </div>
      <Divider my={'sm'} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Sender Information</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Name</p>
          <p className="text-sm opacity-80">Cedrick</p>
        </div>
      </div>
      <Divider my={'sm'} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Reciever Information</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Name</p>
          <p className="text-sm opacity-80">Cedrick</p>
        </div>
      </div>
      <Divider my={'sm'} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Department Info</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Name</p>
          <p className="text-sm opacity-80">Cedrick</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDocument;
