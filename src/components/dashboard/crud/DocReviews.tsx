import AsyncMultiSelect from "@/components/core/AsyncMultiSelect";
import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import { IDocument } from "@/types/base.type";
import { Button, Input, Select, Table } from "@mantine/core";
import React, { useEffect } from "react";
import { DateTimePicker } from "@mantine/dates";
import AsyncSelect from "@/components/core/AsyncSelect";
import { AuthAPi, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
import { DocumentReview, Reviewer } from "@/types/doc.type";
import { IUser } from "@/types/user.type";
import ChangeDeadline from "./ChangeDeadline";

interface Props {
  doc: IDocument | null;
  onClose?: () => void;
  refresh?: () => void;
}

const DocReviews = ({ doc, onClose, refresh }: Props) => {
  const { user } = useAuth();
  const {
    data: documentReviews,
    loading: loadingReviews,
    get,
  } = useGet<DocumentReview[]>(`/document-reviews/by-document/${doc?.id}`, {
    defaultData: [],
  });
  const defaultData = {
    documentId: doc?.id,
    createdBy: user?.id,
    expectedCompleteTime: new Date().toISOString(),
    reviewers: [],
    whoHasFinalReview: "",
  };
  const [requestData, setRequestData] = React.useState(defaultData);
  const [departmentId, setDepartmentId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [reviewer, setReviewer] = React.useState<Reviewer | null>(null);
  const [users, setUsers] = React.useState<IUser[] | null>(null);
  const [reviewers, setReviewers] = React.useState<IUser[] | null>(null);
  const [showChangeDeadline, setShowChangeDeadline] = React.useState({
    isOpen: false,
    data: null as DocumentReview | null,
  });

  const requestReview = async () => {
    console.log(requestData);
    if (!requestData.reviewers.length) return;
    setLoading(true);
    try {
      const res = await AuthAPi.post(`/document-reviews/request`, requestData);
      console.log(res);
      notifications.show({
        title: "Success",
        message: "Document review requested successfully",
        color: "blue",
      });
      setRequestData(defaultData);
      refresh?.();
      onClose?.();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: getResError(error),
        color: "red",
      });
    }
  };

  useEffect(() => {
    const revs: IUser[] = [];
    // const revs = users?.filter((d) =>
    //   requestData.reviewers.some((r) => r === d.id)
    // );
    requestData.reviewers.forEach((r) => {
      const user = users?.find((u) => u.id === r);
      if (user) revs.push(user);
    });
    console.log("revs", revs);
    console.log("users", users);
    console.log("requestData.reviewers", requestData?.reviewers);
    if (!revs) return;
    setReviewers(revs);
    if (revs?.length === 1) {
      setRequestData({ ...requestData, whoHasFinalReview: revs[0].id });
    } else {
      setRequestData({ ...requestData, whoHasFinalReview: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestData.reviewers, users]);

  const isDeptHead = user?.roles.some((r) => r.roleName === "DEPARTMENT_HEAD");
  // const isMine =
  return (
    <div className="flex flex-col w-full gap-y-2">
      {documentReviews && documentReviews?.length > 0 && (
        <div className=" overflow-x-auto py-4">
          <Table align="left" className=" text-sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="p-2 whitespace-nowrap">
                  Department
                </Table.Th>
                <Table.Th className="p-2 whitespace-nowrap">
                  Expected Completion Time
                </Table.Th>
                <Table.Th className="p-2 whitespace-nowrap">Deadline</Table.Th>
                {isDeptHead && (
                  <Table.Th className="p-2 whitespace-nowrap">Actions</Table.Th>
                )}
              </Table.Tr>
            </Table.Thead>
            {documentReviews?.map((review, i) => (
              <Table.Tr key={review.id}>
                <Table.Td className="p-2 whitespace-nowrap">
                  {review.sendingDepartment?.name}
                </Table.Td>
                <Table.Td className="p-2 whitespace-nowrap">
                  {new Date(review.expectedCompleteTime).toDateString()}
                </Table.Td>
                <Table.Td className="p-2 whitespace-nowrap">
                  {new Date(review.deadline).toLocaleString()}
                </Table.Td>
                {isDeptHead && (
                  <Table.Td className="p-2 whitespace-nowrap">
                    <Button
                      onClick={() =>
                        setShowChangeDeadline({
                          isOpen: true,
                          data: review,
                        })
                      }
                      size="xs"
                      radius="sm"
                      variant="outline"
                      color="blue"
                    >
                      Change Deadline
                    </Button>
                  </Table.Td>
                )}
              </Table.Tr>
            ))}
          </Table>
        </div>
      )}
      {loadingReviews && (
        <div className="flex w-full justify-center">
          <p>Loading...</p>
        </div>
      )}
      {!loadingReviews && documentReviews?.length === 0 && (
        <>
          <p className="text-sm text-primary">
            No one requested to view this doc yet
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestReview();
            }}
            className="flex flex-col gap-y-2"
          >
            <DateTimePicker
              label="Expected Completion Time"
              placeholder="Pick date and time"
              onChange={(value) => {
                if (!value) return;
                setRequestData({
                  ...requestData,
                  expectedCompleteTime: new Date(value).toISOString(),
                });
              }}
              minDate={new Date()}
            />
            <Input.Wrapper
              w={"100%"}
              label="Department"
              description="Department"
            >
              <AsyncSelect
                selectDataUrl="/department/all"
                value={departmentId}
                onChange={(val) => {
                  console.log(val);
                  if (!val) return;
                  setDepartmentId(val);
                }}
              />
            </Input.Wrapper>
            <Input.Wrapper
              w={"100%"}
              label="Select Reviewers"
              description="Reviewer Name"
            >
              <AsyncMultiSelect
                datasrc={
                  departmentId
                    ? `/users/department/${departmentId}`
                    : `/users/all`
                }
                labelKey="username"
                filterData={(data) => data.filter((d) => d.id !== user?.id)}
                // value={reviewers?.map((d) => ({
                //   value: d.id,
                //   label: d.username,
                // }))}
                data={reviewers ?? []}
                onChange={(val) => {
                  console.log(val);
                  if (!val) return;
                  setRequestData({ ...requestData, reviewers: val });
                }}
                variant="default"
                setData={(data) => {
                  const newUsers = structuredClone(users ?? []);
                  data.forEach((d) => {
                    const userExists = users?.find((u) => u.id === d.id);
                    if (!userExists) newUsers.push(d);
                  });
                  setUsers(newUsers);
                }}
              />
            </Input.Wrapper>
            <Input.Wrapper
              w={"100%"}
              label="Select Main Reviewer"
              description="Main Reviewer Name"
            >
              <Select
                data={reviewers?.map((d) => ({
                  value: d.id,
                  label: d.username,
                }))}
                value={requestData.whoHasFinalReview}
                onChange={(val) => {
                  console.log(val);
                  if (!val) return;
                  setRequestData({ ...requestData, whoHasFinalReview: val });
                }}
                nothingFoundMessage="No Reviewers selected"
                variant="default"
              />
            </Input.Wrapper>
            <Button
              type="submit"
              loading={loading || loadingReviews}
              disabled={loading || loadingReviews}
              color="blue"
            >
              Request Review
            </Button>
          </form>
        </>
      )}
      <ChangeDeadline
        isOpen={showChangeDeadline.isOpen}
        onClose={() =>
          setShowChangeDeadline({
            isOpen: false,
            data: null,
          })
        }
        data={showChangeDeadline.data}
        refresh={get}
      />
    </div>
  );
};

export default DocReviews;
