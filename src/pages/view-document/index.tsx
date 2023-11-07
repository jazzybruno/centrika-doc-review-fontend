import { AuthAPi } from "@/utils/fetcher";
import { ActionIcon } from "@mantine/core";
import React, { useEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ViewDocumentPdf = () => {
  const params = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pdf, setPdf] = React.useState(null as any);
  //   const pdfUrl = `http://194.163.167.131:8800/api/document/download/${params.id}.pdf`; // replace with your actual URL

  const getDocument = async () => {
    setLoading(true);
    try {
      const res = await AuthAPi.get(`/document/${params.id}`);
      console.log(res.data);
      setPdf(res.data?.data);
      setPdfUrl(
        `http://194.163.167.131:8800/api/document/download/${res.data.data.fileUrl}`
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(pdfUrl);
  return (
    <div className=" w-full flex-col flex items-center">
      <div className="flex w-full md:px-11 px-4 py-3 justify-between">
        <ActionIcon
          variant="outline"
          color="blue"
          onClick={() => window.history.back()}
        >
          <BiArrowBack />
        </ActionIcon>
        <a
          target="_blank"
          href={`${pdfUrl}`}
          download={`${pdf?.title??'document'}`}
          className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
        >
          <AiOutlineCloudDownload />
          Download
        </a>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && pdfUrl && (
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
};

export default ViewDocumentPdf;
