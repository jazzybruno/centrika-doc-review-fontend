import { IDocument, IDocumentReview } from "@/types/base.type";
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import useGet from "@/hooks/useGet";
import { DocumentReview, Reviewer } from "@/types/doc.type";
import { useAuth } from "@/contexts/AuthProvider";

interface Props {
  doc: IDocument | null;
  onClose?: () => void;
  refresh?: () => void;
  reviewers: Reviewer[];
}

const DocReview = ({ doc, onClose, reviewers }: Props) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const { data: documentReviews, loading: loadingReviews } = useGet<
    DocumentReview[]
  >(`/document-reviews/by-document/${doc?.id}`, {
    defaultData: [],
  });
  const [reviewer, setReviewer] = useState<Reviewer | null>(null);

  useEffect(() => {
    if (reviewers.length === 0 || !documentReviews) return;
    const reviewer = reviewers.find((rev) => rev.user.id === user?.id);
    console.log("reviewer", reviewer);
    setReviewer(reviewer ?? null);
  }, [reviewers, documentReviews, user?.id]);

  return (
    <div className="flex flex-col w-full">
      {reviewer?.status === "REVIEWED" && (
        <span className="text-sm text-blue-900">
          You have already reviewed this document
        </span>
      )}
      {reviewers.length > 0 && reviewer?.status !== "REVIEWED" && (
        <ReviewForm
          reviewer={reviewer}
          docReview={documentReviews?.[0] ?? null}
          onClose={onClose}
        />
      )}
      {reviewers.length === 0 && <div>Loading...</div>}
    </div>
  );
};

export default DocReview;
