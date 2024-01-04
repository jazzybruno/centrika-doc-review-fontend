import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { baseUrl } from "@/utils/fetcher";
import DocViewer, {
  DocViewerRenderers,
  MSDocRenderer,
} from "@cyntler/react-doc-viewer";
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Divider,
  Overlay,
} from "@mantine/core";
import moment from "moment";
import React, { FC, useState } from "react";
import { AiFillFilePdf, AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import DocReview from "./DocReview";
import Reviewers from "./Reviewers";
import DocReviews from "./DocReviews";
import { DocReviewAction, Reviewer } from "@/types/doc.type";
import PreviewDoc from "./PreviewDoc";
import { getStatusColor } from "@/utils/funcs";
import Predecessors from "./Predecessors";
import Successors from "./Successors";

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
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const {
    data: docReviewActions,
    loading: loadingActions,
    get: getReviewActions,
  } = useGet<DocReviewAction[]>(`/review-actions/by-document/${doc?.id}`, {
    defaultData: [],
  });
  console.log("docReviewActions", docReviewActions);

  const otherDocs = [] as any;

  const isMine = doc?.createdBy?.id === user?.id;

  return (
    <div className="fixed z-50 h-screen p-11 top-0 left-0 w-full">
      <Overlay zIndex={-1} onClick={onClose} className=" absolute" />
      <div className="flex z-10 bg-white h-full">
        <PreviewDoc doc={doc} />
        <div className="flex w-full max-w-lg bg-slate-50 px-4 flex-col overflow-y-auto gap-y-3 pt-2">
          <div className="flex justify-between">
            <a
              target="_blank"
              href={`${baseUrl}/documents/download/${doc?.fileUrl}`}
              download={`${doc?.title ?? "document"}`}
              className=" p-2 h-fit rounded-3xl disabled:opacity-50 hover:bg-gray-200 duration-300 text-sm font-semibold flex items-center gap-x-2 bg-gray-100 text-primary"
            >
              <AiOutlineCloudDownload />
              Download
            </a>
            <Button onClick={onClose} variant="outline" color="blue">
              Close
            </Button>
          </div>
          <Accordion defaultValue={"Document Information"}>
            {
              <Accordion.Item value="Document Information">
                <Accordion.Control>Document Info</Accordion.Control>
                <Accordion.Panel>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-x-2">
                      <button className=" p-2 rounded-full bg-gray-100">
                        <AiFillFilePdf size={25} className="text-red-500 " />
                      </button>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">{doc?.title}</p>
                        <p className="text-xs text-primary">{doc?.status}</p>
                        <p className="text-sm opacity-80">
                          By {creator?.username}
                        </p>
                      </div>
                    </div>
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
                          <p className="text-sm opacity-80">
                            By {creator?.username}
                          </p>
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
                    <h1 className=" font-semibold">Creator Information</h1>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-sm font-semibold">
                        {creator?.username}
                      </p>
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
                </Accordion.Panel>
              </Accordion.Item>
            }
            {isReviewing && (
              <Accordion.Item value="Review Document">
                <Accordion.Control>Review Document</Accordion.Control>
                <Accordion.Panel>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-sm font-semibold"></p>
                    <DocReview
                      reviewers={reviewers}
                      doc={doc}
                      onClose={onClose}
                      refresh={refresh}
                    />
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            )}
            {isMine && (
              <Accordion.Item value="Request Review">
                <Accordion.Control>Document Review </Accordion.Control>
                <Accordion.Panel>
                  <div className="flex flex-col gap-y-2">
                    <DocReviews doc={doc} onClose={onClose} refresh={refresh} />
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            )}
            <Accordion.Item value="Reviewers">
              <Accordion.Control>Reviewers</Accordion.Control>
              <Accordion.Panel>
                <Reviewers doc={doc} setReviewers={setReviewers} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Reviews">
              <Accordion.Control>Review Actions</Accordion.Control>
              <Accordion.Panel>
                <h1 className=" font-semibold">Reviews</h1>
                {loadingActions && (
                  <span className="text-sm">Loading reviews Actions...</span>
                )}
                {docReviewActions?.length === 0 && !loadingActions && (
                  <span className="text-sm">No reviews Actions yet</span>
                )}
                {docReviewActions?.map((action, i) => (
                  <>
                    <div className="flex items-start relative">
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${action.reviewer?.user?.username}`}
                        size=""
                        className="mt-2"
                        radius="xl"
                      />
                      <div
                        key={action.id}
                        className="flex flex-col bg-foreground p-2 rounded-md"
                      >
                        <p className="text-sm font-semibold">
                          {action.reviewer?.user?.username}
                        </p>
                        <p className="text-sm ">{action.comment.content}</p>
                        <p className="text-sm opacity-70">
                          {moment(action?.comment.createdAt).fromNow()}
                        </p>
                      </div>
                      <Badge
                        color={getStatusColor(action.action)}
                        variant="filled"
                        className="absolute top-0 right-0"
                      >
                        {action.action}
                      </Badge>
                    </div>
                    {docReviewActions?.length - 1 !== i && (
                      <Divider my={"sm"} />
                    )}
                  </>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Predecessors">
              <Accordion.Control>
                Predecessors{" "}
                {doc?.hasPredecessors ? (
                  <Badge color="green">Available</Badge>
                ) : (
                  <Badge color="red">N/A</Badge>
                )}
              </Accordion.Control>
              <Accordion.Panel>
                <Predecessors doc={doc} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Successors">
              <Accordion.Control>
                Successors{" "}
                {doc?.hasSuccessors ? (
                  <Badge color="green">Available</Badge>
                ) : (
                  <Badge color="red">N/A</Badge>
                )}
              </Accordion.Control>
              <Accordion.Panel>
                <Successors doc={doc} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentReview;
