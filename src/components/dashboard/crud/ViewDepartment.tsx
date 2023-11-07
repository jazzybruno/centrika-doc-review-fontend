import { IDepartment, IDocument } from "@/types/base.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Divider } from "@mantine/core";
import React from "react";
import { FC } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  department: IDepartment | null;
}

const ViewDepartment: FC<Props> = ({ department }) => {
  const [activeDocuments, setActiveDocuments] = React.useState<IDocument[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getActiveDocuments = async () => {
    setLoading(true);
    try {
      const res = await AuthAPi.get(`/document/department/${department?.id}`);
      console.log(res);
      setActiveDocuments(res.data?.data?.slice(0, 4));
    } catch (error) {
      console.log(error);
      setError(getResError(error));
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getActiveDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex w-full flex-col gap-y-3">
      <h1 className=" opacity-70 text-lg">{department?.name}</h1>
      <Divider my={"md"} />
      <p>{department?.description}</p>
      <Divider my={"md"} />
      <div className="flex w-full gap-y-3 flex-col ">
        <div className="flex items-center justify-between text-sm font-semibold">
          <p>Active Documents</p>
          <Link className=" text-primary" to={"/documents"}>
            View All
          </Link>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {activeDocuments.length === 0 && <p>No Active Documents</p>}
        {activeDocuments.map((doc, i) => (
          <>
            <div className="flex w-full items-center gap-x-2">
              <button className=" p-2 rounded-lg bg-gray-100">
                <AiFillFilePdf size={30} className="text-red-500 " />
              </button>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{doc.title}</p>
                <p className="text-xs text-primary">{doc.status}</p>
                <p className="text-sm opacity-80">{doc.createdBy.username}</p>
              </div>
            </div>
            {i !== activeDocuments.length -1 && <Divider />}
          </>
        ))}
      </div>
      <div className="flex text-sm flex-col gap-y-2">
        <p>Issued On</p>
        <p>2021-10-10</p>
      </div>
    </div>
  );
};

export default ViewDepartment;
