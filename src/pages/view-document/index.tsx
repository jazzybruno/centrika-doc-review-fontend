import { AuthAPi, baseUrl } from "@/utils/fetcher";
import { ActionIcon, Button } from "@mantine/core";
import React, { useEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ViewDocumentPdf = ({ fileUrl }: { fileUrl?: string }) => {
  const params = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pdf, setPdf] = React.useState(null as any);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [scale, setScale] = React.useState(1);
  //   const pdfUrl = `http://194.163.167.131:8800/api/document/download/${params.id}.pdf`; // replace with your actual URL

  const getDocument = async () => {
    setLoading(true);
    try {
      const res = await AuthAPi.get(`/document/${params.id}`);
      console.log(res.data);
      setPdf(res.data?.data);
      setPdfUrl(`${baseUrl}/document/download/${res.data.data.fileUrl}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (fileUrl) return setPdfUrl(fileUrl);
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(pdfUrl);
  return (
    <div className=" w-full flex-col flex items-center">
      <div className="flex w-full sticky top-0 z-10 bg-white md:px-11 px-4 py-3 justify-between">
        {pdfUrl ? (
          <div className="flex items-center gap-x-2">
            <ActionIcon
              variant="outline"
              color="blue"
              onClick={() => setScale((prev) => prev - 0.2)}
            >
              <FaMagnifyingGlassMinus />
            </ActionIcon>
            <ActionIcon
              variant="outline"
              color="blue"
              onClick={() => setScale((prev) => prev + 0.2)}
            >
              <FaMagnifyingGlassPlus />
            </ActionIcon>
            {/* percentage */}
            <p className="text-sm font-semibold">{Math.round(scale * 100)}%</p>
          </div>
        ) : (
          <ActionIcon
            variant="outline"
            color="blue"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </ActionIcon>
        )}
        <div className="flex items-center gap-x-2">
          {/* change pages */}
          <Button
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={pageNumber === 1}
            variant="light"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber === pdf?.pages}
            variant="light"
            size="sm"
          >
            Next
          </Button>
        </div>
        <a
          target="_blank"
          href={`${pdfUrl}`}
          download={`${pdf?.title ?? "document"}`}
          className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
        >
          <AiOutlineCloudDownload />
          Download
        </a>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && pdfUrl && (
        <Document file={pdfUrl}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            onLoadError={(e) => {
              console.log("pdf err", e.message);
              if (e.message === "Invalid page request.") {
                setPageNumber((prev) => prev - 1);
              }
            }}
          />
        </Document>
      )}
    </div>
  );
};

export default ViewDocumentPdf;
