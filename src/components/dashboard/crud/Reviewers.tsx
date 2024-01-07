import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { Reviewer } from "@/types/doc.type";
import { AuthAPi } from "@/utils/fetcher";
import { ActionIcon, Avatar, Badge, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { BiDotsHorizontal, BiDotsHorizontalRounded } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { IoIosAlarm } from "react-icons/io";

interface Props {
  doc: IDocument | null;
  setReviewers: React.Dispatch<React.SetStateAction<Reviewer[]>>;
}

const Reviewers: React.FC<Props> = ({ doc, setReviewers }) => {
  const {
    data: reviewers,
    loading,
    get,
  } = useGet<Reviewer[]>(`/reviewers/document/${doc?.id}`, {
    defaultData: [],
  });

  useEffect(() => {
    if (!reviewers) return;
    setReviewers(reviewers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewers]);

  ///api/document-reviews/remind/{reviewerId}
  const remind = async (reviewerId: string) => {
    console.log(reviewerId);
    try {
      const res = await AuthAPi.post(
        `/document-reviews/remind/${reviewerId}`,
        {}
      );
      console.log(res);
      notifications.show({
        title: "Success",
        message: "Reviewer reminded successfully",
        color: "blue",
      });
      await get();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: "Error reminding reviewer",
        color: "red",
      });
    }
  };

  return (
    <>
      <span className=" text-primary font-semibold text-sm">
        Main Reviewer is highlighted
      </span>
      <div className="flex mt-3 flex-col gap-y-2 w-full">
        {reviewers?.map((reviewer) => (
          <div
            key={reviewer.id}
            className={`flex w-full relative items-center rounded-lg p-1 gap-x-2
            ${reviewer.hasFinalReview ? "bg-primary/10" : ""}
            `}
          >
            <Avatar
              src={`https://ui-avatars.com/api/?name=${reviewer.user.username}+${reviewer.user.email}&bold=true`}
              size={"lg"}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{reviewer.user.username}</p>
              <p className="text-xs text-primary">{reviewer.user.email}</p>
              <Badge
                color={reviewer.status === "PENDING" ? "orange" : "green"}
                variant="light"
              >
                {reviewer.status}
              </Badge>
            </div>
            <div className="absolute right-1">
              <Menu width={200}>
                <Menu.Target>
                  <ActionIcon variant="light">
                    <BiDotsHorizontalRounded />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => remind(reviewer.id)}
                    leftSection={<IoIosAlarm />}
                  >
                    Remind
                  </Menu.Item>
                  {!reviewer.hasFinalReview && (
                    <Menu.Item leftSection={<FaPerson />}>
                      Make Main Reviewer
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        ))}
        {!loading && reviewers?.length === 0 && (
          <p className="text-sm text-primary">
            No one requested to view this doc yet
          </p>
        )}
      </div>
    </>
  );
};

export default Reviewers;
