import MainModal from "@/components/core/MainModal";
import { useAuth } from "@/contexts/AuthProvider";
import { DocumentReview } from "@/types/doc.type";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { Button, Input, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: DocumentReview | null;
  refresh?: () => void;
}

const ChangeDeadline = ({ onClose, isOpen, refresh, data: _data }: Props) => {
  const { user } = useAuth();
  const [data, setData] = React.useState<any>({
    deadline: "",
    message: "",
    departmentHeadId: user?.id ?? "",
  });
  const [loading, setLoading] = React.useState(false);

  // /api/document-reviews/deadline/{documentReviewId}
  const changeDeadline = async (docReviewId: string, data: any) => {
    try {
      const res = await AuthAPi.patch(
        `/document-reviews/deadline/${docReviewId}`,
        data
      );
      console.log(res);
      notifications.show({
        title: "Success",
        message: "Deadline changed successfully",
        color: "blue",
      });
      refresh?.();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!_data) return;
    setLoading(true);
    await changeDeadline(_data.id, data);
    setLoading(false);
    onClose();
  };

  return (
    <MainModal title="Change Deadline" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-2">
        <DateTimePicker
          placeholder="Deadline"
          label="Set new Deadline"
          value={data.deadline}
          onChange={(e) => {
            if (!e) return setData({ ...data, deadline: "" });
            console.log(e?.toISOString());
            setData({ ...data, deadline: e });
          }}
          minDate={new Date()}
          required
          clearable
        />
        <Input.Wrapper w={"100%"} label="Message" description="Message">
          <Textarea
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            required
          />
        </Input.Wrapper>
        <Button type="submit" loading={loading} disabled={loading}>
          Change Deadline
        </Button>
      </form>
    </MainModal>
  );
};

export default ChangeDeadline;
