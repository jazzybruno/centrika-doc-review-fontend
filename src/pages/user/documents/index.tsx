import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDocument from "@/components/dashboard/crud/AddUpdateDocument";
import ViewDocument from "@/components/dashboard/crud/ViewDocument";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDocumentReview } from "@/types/base.type";
import { getStatusColor } from "@/utils/funcs";
import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiSolidMessageSquareDetail, BiTrash } from "react-icons/bi";

const Documents = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [reqType, setReqType] = React.useState("mine");
  const [isReviewing, setIsReviewing] = React.useState({
    opened: false,
    data: null as IDocumentReview | null,
  });
  const [viewDoc, setViewDoc] = React.useState({
    opened: false,
    data: null as IDocumentReview | null,
  });
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
      header: "Date Created",
      cell: ({ row }) => (
        <h6 className="">
          {moment(row.original.createdAt).format("DD/MM/YYYY")}
        </h6>
      ),
    },
    {
      header: "status",
      cell: ({ row }) => (
        <Badge
          size="lg"
          color={getStatusColor(row.original.status)}
          className=""
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "class",
      cell: (row) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            variant="transparent"
            color="black"
            onClick={() =>
              setViewDoc({
                opened: true,
                data: row.row.original,
              })
            }
          >
            <AiOutlineEye />
          </ActionIcon>
          {reqType !== "mine" && (
            <Tooltip label="Review">
              <ActionIcon
                variant="transparent"
                color="black"
                onClick={() =>
                  setIsReviewing({
                    opened: true,
                    data: row.row.original,
                  })
                }
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
        {!loading && !error && <DataTable columns={columns} data={documents?.reverse()} />}
      </div>
      <Drawer
        opened={showDrawer}
        onClose={() => setShowDrawer(false)}
        padding="md"
        size="md"
        position="right"
        closeOnClickOutside={false}
        title={
          <span className=" font-semibold"> {"Request Document Review"}</span>
        }
      >
        <AddUpdateDocument refetch={get} onClose={() => setShowDrawer(false)} />
      </Drawer>
      <Drawer
        opened={viewDoc.opened || isReviewing.opened}
        onClose={() => {
          setViewDoc({
            opened: false,
            data: null,
          });
          setIsReviewing({
            opened: false,
            data: null,
          });
        }}
        closeOnClickOutside={!isReviewing.opened}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Document Overview"}</span>}
      >
        <ViewDocument
          document={viewDoc.data ?? isReviewing.data}
          isReviewing={isReviewing.opened}
          onClose={() => {
            get();
            setViewDoc({
              opened: false,
              data: null,
            });
            setIsReviewing({
              opened: false,
              data: null,
            });
          }}
        />
      </Drawer>
    </DashboardLayout>
  );
};

export default Documents;
