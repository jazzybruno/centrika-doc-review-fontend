import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { ActionIcon, Button, Divider, Overlay } from "@mantine/core";
import moment from "moment";
import React, { FC } from "react";
import { AiFillFilePdf, AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import ReviewForm from "./ReviewForm";
import { baseUrl } from "@/utils/fetcher";

interface Props {
  document: IDocument | null;
  isReviewing?: boolean;
  onClose?: () => void;
  refresh?: () => void;
}

const ViewDocumentReview: FC<Props> = ({
  document: doc,
  isReviewing,
  onClose,
  refresh,
}) => {
  const { user } = useAuth();
  const creator = doc?.createdBy;
  const { data: comments, loading } = useGet(
    `/comments/document-review/${doc?.id}`,
    { defaultData: [] }
  );
  const [loadingDownload, setLoadingDownload] = React.useState(false);
  const [showReviewForm, setShowReviewForm] = React.useState(false);

  const encodeUrl = (url: string) => {
    return url.replace(/\s/g, "%20");
  };

  const otherDocs = [] as any;

  return (
    <div className="fixed z-50 h-screen p-11 top-0 left-0 w-full">
      <Overlay zIndex={-1} onClick={onClose} className=" absolute" />
      <div className="flex z-10 bg-white h-full">
        <div className="flex w-full h-full">
          <DocViewer
            documents={[
              {
                uri: `${baseUrl}/documents/download/${doc?.fileUrl}`,
                fileType: "pdf",
              },
            ]}
            pluginRenderers={DocViewerRenderers}
          />
          {/* <div className="h-full w-8 border-x"></div> */}
        </div>
        <div className="flex w-full max-w-lg bg-slate-50 px-4 flex-col overflow-y-auto gap-y-3 pt-11">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-2">
              <button className=" p-2 rounded-full bg-gray-100">
                <AiFillFilePdf size={25} className="text-red-500 " />
              </button>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{doc?.title}</p>
                <p className="text-xs text-primary">{doc?.status}</p>
                <p className="text-sm opacity-80">By {creator?.username}</p>
              </div>
            </div>
            {/* <Link
              to={`/document/${doc?.id}`}
              // download={`${reviewDoc?.title}`}
              className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
            >
              <AiOutlineCloudDownload />
              View
            </Link> */}
            <Button onClick={onClose} variant="outline" color="blue">
              Close
            </Button>
          </div>
          {(otherDocs?.length as number) > 0 && (
            <>
              <Divider my={"sm"} />
              <h1>Other docs associated with this request</h1>
            </>
          )}
          {otherDocs?.map((doc_) => (
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-x-2">
                <button className=" p-2 rounded-full bg-gray-100">
                  <AiFillFilePdf size={25} className="text-red-500 " />
                </button>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{doc_?.title}</p>
                  <p className="text-xs text-primary">{doc_?.status}</p>
                  <p className="text-sm opacity-80">By {creator?.username}</p>
                </div>
              </div>
              <Link
                to={`/document/${doc_?.id}`}
                // download={`${doc?.reviewDoc?.title}`}
                className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
              >
                <AiOutlineCloudDownload />
                View
              </Link>
            </div>
          ))}
          <Divider my={"sm"} />
          <div className="flex w-full flex-col gap-y-3">
            <h1 className=" font-semibold">Sender Information</h1>
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold">{creator?.username}</p>
              <a
                href={`mailto:${creator?.email}`}
                className="text-sm opacity-80"
              >
                {creator?.email}
              </a>
            </div>
          </div>
          <Divider my={"sm"} />
          <div className="flex w-full flex-col gap-y-3">
            {/* <h1 className=" font-semibold">Receivers Information</h1> */}
            {/* {doc?.reviewers.map((reviewer) => (
          <div
            key={reviewer.id}
            className="flex flex-col bg-foreground p-2 rounded-md gap-y-2"
          >
            <p className="text-sm font-semibold">
              username:{reviewer.username}
            </p>
            <a href={`mailto:${reviewer.email}`} className="text-sm opacity-80">
              email: {reviewer.email}
            </a>
            <p className="text-sm opacity-80">
              department: {reviewer?.department?.name}
            </p>
          </div>
        ))} */}
          </div>
          <Divider my={"sm"} />
          <div className="flex w-full flex-col gap-y-3">
            <h1 className=" font-semibold">Department Info</h1>
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold">
                {creator?.department?.name}
              </p>
              <p className="text-sm opacity-80">
                {creator?.department.description}
              </p>
            </div>
          </div>
          <Divider my={"sm"} />
          <div className="flex items-center justify-between">
            <h1 className=" font-bold">Reviews</h1>
            <Button
              onClick={() => setShowReviewForm(true)}
              variant="outline"
              color="blue"
            >
              Add Review
            </Button>
          </div>
          {showReviewForm && <ReviewForm document={doc} onClose={onClose} />}
          {comments.length === 0 && !loading && (
            <span className="text-sm">No comments yet</span>
          )}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col bg-foreground p-2 rounded-md"
            >
              <p className="text-sm font-semibold">
                {comment?.commentCreator?.username}
              </p>
              <p className="text-sm ">{comment?.content}</p>
              <p className="text-sm opacity-70">
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentReview;
