import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDocument from "@/components/dashboard/crud/AddUpdateDocument";
import ViewDocument from "@/components/dashboard/crud/ViewDocument";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDocumentReview } from "@/types/base.type";
import {
  ActionIcon,
  Button,
  Drawer,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiSolidMessageSquareDetail, BiTrash } from "react-icons/bi";

const Documents = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [reqType, setReqType] = React.useState("mine");
  const [viewDoc, setViewDoc] = React.useState(false);
  const { user } = useAuth();
  const {
    data: documents,
    get,
    loading,
    error,
  } = useGet<IDocumentReview[]>(
    reqType === "mine"
      ? `/document-reviews/sender/${user?.id}`
      : `/document-reviews/reviewer/${user?.id}`,
    {
      defaultData: [],
      onMount: false,
    }
  );

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqType]);

  const columns: ColumnDef<IDocumentReview>[] = [
    {
      header: "File Name",
      cell: ({ row }) => <h6 className="">{row.original.reviewDoc.title}</h6>,
    },
    {
      header: "File Url",
      cell: ({ row }) => <h6 className="">{row.original.reviewDoc.fileUrl}</h6>,
    },
    {
      header: "Actions",
      accessorKey: "class",
      cell: (row: any) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            variant="transparent"
            color="black"
            onClick={() => setViewDoc(true)}
          >
            <AiOutlineEye />
          </ActionIcon>
          {reqType !== "mine" && (
            <Tooltip label="Review">
              <ActionIcon
                variant="transparent"
                color="black"
                onClick={() => setViewDoc(true)}
              >
                <BiSolidMessageSquareDetail />
              </ActionIcon>
            </Tooltip>
          )}
          {reqType === "mine" && (
            <ActionIcon
              // onClick={() => onDelete(row.original)}
              variant="transparent"
              color="red"
              radius="xl"
            >
              <BiTrash />
            </ActionIcon>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout
      right={
        <Button
          size="md"
          onClick={() => setShowDrawer(true)}
          radius={"md"}
          className=" duration-300"
        >
          Request Document
        </Button>
      }
    >
      <SegmentedControl
        w={300}
        onChange={(value) => setReqType(value)}
        data={[
          { value: "mine", label: "My Requests" },
          { value: "to-me", label: "Requested to me" },
        ]}
      />
      <div className="flex w-full flex-col p-3">
        {loading && <TableSkeleton columns={columns} />}
        {error && (
          <div className="flex flex-col items-center w-full">
            <span className="flex items-center justify-center text-red-700 text-sm">
              {error}
            </span>
            <Button
              onClick={get}
              mt={3}
              className="flex items-center gap-x-2"
              px={3}
            >
              <AiOutlineReload
                size={20}
                className={`mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Retry
            </Button>
          </div>
        )}
        {!loading && !error && <DataTable columns={columns} data={documents} />}
      </div>
      <Drawer
        opened={showDrawer}
        onClose={() => setShowDrawer(false)}
        padding="md"
        size="md"
        position="right"
        title={
          <span className=" font-semibold"> {"Request Document Review"}</span>
        }
      >
        <AddUpdateDocument refetch={get} onClose={() => setShowDrawer(false)} />
      </Drawer>
      <Drawer
        opened={viewDoc}
        onClose={() => setViewDoc(false)}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Document Overview"}</span>}
      >
        <ViewDocument />
      </Drawer>
    </DashboardLayout>
  );
};

export default Documents;
