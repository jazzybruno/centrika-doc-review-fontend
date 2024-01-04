import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import { IDocument, IDocumentReview } from "@/types/base.type";
import { Divider } from "@mantine/core";
import moment from "moment";
import { FC } from "react";
import { AiFillFilePdf, AiOutlineCloudDownload } from "react-icons/ai";
import ReviewForm from "./ReviewForm";
import React from "react";
import { AuthAPi } from "@/utils/fetcher";
import { Link } from "react-router-dom";

interface Props {
  document: IDocument | null;
}

const ViewDocument: FC<Props> = ({ document: doc }) => {
  const { user } = useAuth();
  // const creator = doc?.createdBy;
  const [loadingDownload, setLoadingDownload] = React.useState(false);

  const downloadDocument = async () => {
    setLoadingDownload(true);
    try {
      const res = await AuthAPi.get(`/documents/download/${doc?.fileUrl}`, {
        // responseType: "blob",
      });
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document?.createElement("a");
      link.href = url;
      link.setAttribute("download", doc?.title ?? "document.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
    setLoadingDownload(false);
  };

  return (
    <div className="flex w-full flex-col overflow-y-auto gap-y-3 pt-11">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-2">
          <button className=" p-2 rounded-full bg-gray-100">
            <AiFillFilePdf size={25} className="text-red-500 " />
          </button>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{doc?.title}</p>
            <p className="text-xs text-primary">{doc?.status}</p>
            <p className="text-sm opacity-80">By {doc?.createdBy.username}</p>
          </div>
        </div>
        <Link
          to={`/document/${doc?.id}`}
          // download={`${doc?.reviewDoc?.title}`}
          className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
        >
          <AiOutlineCloudDownload />
          View
        </Link>
      </div>
      <Divider my={"sm"} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Sender Information</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">{doc?.createdBy.username}</p>
          <a
            href={`mailto:${doc?.createdBy.email}`}
            className="text-sm opacity-80"
          >
            {doc?.createdBy.email}
          </a>
        </div>
      </div>
      <Divider my={"sm"} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold">Department Info</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">
            {doc?.createdBy?.department?.name}
          </p>
          <p className="text-sm opacity-80">
            {doc?.createdBy?.department?.description}
          </p>
        </div>
        <p className="text-sm opacity-80">
          Created At {new Date(doc?.createdAt ?? "").toUTCString()}
        </p>
      </div>
    </div>
  );
};

export default ViewDocument;
