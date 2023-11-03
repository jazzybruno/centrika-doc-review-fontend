import { Divider } from "@mantine/core";
import { AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";

const ViewDepartment = () => {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h1 className=" opacity-70 text-lg">Traffic Data</h1>
      <Divider my={"md"} />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit,
        commodi. Quas dicta, aperiam corrupti quia sint iste ipsa dolore
        perspiciatis molestias minus optio labore non exercitationem quo! Cum,
        voluptas reiciendis! Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Debitis odio accusamus eveniet rerum consequatur velit, nisi unde
        voluptatum iste eius eum perspiciatis tenetur perferendis incidunt dicta
        nesciunt repudiandae, esse possimus!
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
