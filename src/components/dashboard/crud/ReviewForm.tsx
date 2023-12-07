import AsyncSelect from "@/components/core/AsyncSelect";
import { useAuth } from "@/contexts/AuthProvider";
import { DocumentReview, Reviewer } from "@/types/doc.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  docReview: DocumentReview | null;
  onClose?: () => void;
  reviewer: Reviewer | null;
}

const ReviewForm: FC<Props> = ({ docReview, onClose, reviewer }) => {
  const { user } = useAuth();
  console.log("docReview", docReview);
  console.log("reviewer", reviewer);
  const [review, setReview] = React.useState({
    action: "",
    comment: "",
    newReviewerId: "",
    documentReviewId: docReview?.id ?? "",
    reviewer: reviewer?.id ?? "",
  });
  const [deptId, setDeptId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const isForward = review.action === "FORWARD";
    try {
      const response = await AuthAPi.post(
        `/${isForward ? "document-reviews/forward" : "review-actions/create"}`,
        !isForward
          ? {
              reviewerId: reviewer?.id,
              comment: review.comment,
              action: review.action,
              documentReviewId: review.documentReviewId,
            }
          : {
              newReviewerId: review.newReviewerId,
              reviewDocId: review.documentReviewId,
              reviewer: reviewer?.id,
              commentContent: review.comment,
            }
      );
      console.log(response.data);
      notifications.show({
        title: "Success",
        message: "Review sent successfully",
        color: "blue",
      });
      setLoading(false);
      //   setReview(defaultData);
      onClose?.();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={sendReview} className=" w-full flex flex-col gap-y-4">
      <h1 className=" font-bold">Action</h1>
      <Select
        data={[
          { label: "Approve", value: "APPROVE" },
          { label: "Return", value: "RETURN" },
          { label: "Forward", value: "FORWARD" },
        ]}
        value={review.action}
        onChange={(value) => {
          if (!value) return;
          setReview({ ...review, action: value });
        }}
        placeholder="Select Action"
        required
        className="w-full"
      />
      {review.action === "FORWARD" && (
        <>
          <Input.Wrapper w={"100%"} label="Department" description="Department">
            <AsyncSelect
              selectDataUrl="/department/all"
              onChange={(val) => {
                console.log(val);
                if (!val) return;
                setDeptId(val);
              }}
            />
          </Input.Wrapper>
          <AsyncSelect
            label="Forward To"
            placeholder="Select User"
            selectDataUrl={
              deptId ? `/users/department/${deptId}` : `/users/all`
            }
            value={review.newReviewerId}
            labelKey="username"
            onChange={(value) => {
              if (!value) return;
              setReview({ ...review, newReviewerId: value });
            }}
            required
          />
        </>
      )}
      <Textarea
        onChange={(e) =>
          setReview((prev) => ({ ...prev, comment: e.target.value }))
        }
        value={review.comment}
        required
        placeholder="Review Comment"
        p={2}
        variant="filled"
        size="md"
      />
      <Button
        type="submit"
        radius="md"
        loading={loading}
        disabled={loading}
        w={"100%"}
        size="md"
        mt={8}
        className=" w-full capitalize bg-primary text-white"
      >
        Perform Action ({review.action})
      </Button>
    </form>
  );
};

export default ReviewForm;
