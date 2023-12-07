import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { Reviewer } from "@/types/doc.type";
import { Avatar, Badge } from "@mantine/core";
import React, { useEffect } from "react";

interface Props {
  doc: IDocument | null;
  setReviewers: React.Dispatch<React.SetStateAction<Reviewer[]>>;
}

const Reviewers: React.FC<Props> = ({ doc, setReviewers }) => {
  const { data: reviewers, loading } = useGet<Reviewer[]>(
    `/reviewers/document/${doc?.id}`,
    {
      defaultData: [],
    }
  );

  useEffect(() => {
    if (!reviewers) return;
    setReviewers(reviewers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewers]);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {reviewers?.map((reviewer) => (
        <div
          key={reviewer.id}
          className="flex w-full relative items-center gap-x-2"
        >
          <Avatar
            src={`https://ui-avatars.com/api/?name=${reviewer.user.username}+${reviewer.user.email}&bold=true`}
            size={"md"}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{reviewer.user.username}</p>
            <p className="text-xs text-primary">{reviewer.user.email}</p>
          </div>
          <div className="absolute right-0">
            <Badge
              color={reviewer.status === "PENDING" ? "orange" : "green"}
              variant="light"
            >
              {reviewer.status}
            </Badge>
          </div>
        </div>
      ))}
      {!loading && reviewers?.length === 0 && (
        <p className="text-sm text-primary">
          No one requested to view this doc yet
        </p>
      )}
    </div>
  );
};

export default Reviewers;
