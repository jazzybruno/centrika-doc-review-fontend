import AsyncSelect from "@/components/core/AsyncSelect";
import { useAuth } from "@/contexts/AuthProvider";
import { IDocumentReview } from "@/types/base.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Select, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { FC } from "react";

interface Props {
  document: IDocumentReview | null;
  onClose?: () => void;
}

const ReviewForm: FC<Props> = ({ document, onClose }) => {
  const { user } = useAuth();
  const defaultData = {
    status: "",
    commentContent: "",
    newReviewerId: "",
    reviewDocId: document?.id ?? "",
    reviewer: user?.id ?? "",
  };
  const [review, setReview] = React.useState(defaultData);
  const [deptId, setDeptId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const sendReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const isForward = review.status === "FORWARD";
    try {
      const response = await AuthAPi.post(
        `/document-reviews/doc/${isForward ? "forward" : "review"}`,
        isForward
          ? {
              newReviewerId: review.newReviewerId,
              reviewDocId: review.reviewDocId,
              reviewer: review.reviewer,
              commentContent: review.commentContent,
            }
          : {
              reviewDocId: review.reviewDocId,
              status: review.status,
              reviewer: review.reviewer,
              commentContent: review.commentContent,
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
          { label: "Reject", value: "REJECT" },
          { label: "Forward", value: "FORWARD" },
        ]}
        value={review.status}
        onChange={(value) => {
          if (!value) return;
          setReview({ ...review, status: value });
        }}
        placeholder="Select Action"
        required
        className="w-full"
      />
      {review.status === "FORWARD" && (
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
          setReview((prev) => ({ ...prev, commentContent: e.target.value }))
        }
        value={review.commentContent}
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
        Perform Action ({review.status})
      </Button>
    </form>
  );
};

export default ReviewForm;
