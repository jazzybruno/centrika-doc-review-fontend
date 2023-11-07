import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDocument from "@/components/dashboard/crud/AddUpdateDocument";
import ViewDocument from "@/components/dashboard/crud/ViewDocument";
import ViewDocumentReview from "@/components/dashboard/crud/ViewDocumentReview";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDocument } from "@/types/base.type";
import { getStatusColor } from "@/utils/funcs";
import { ActionIcon, Badge, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";

const Documents = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewDoc, setViewDoc] = React.useState({
    opened: false,
    data: null as any
  });
  const {
    data: documents,
    get,
    loading,
    error,
  } = useGet<IDocument[]>("/document", {
    defaultData: [],
  });

  const columns: ColumnDef<IDocument>[] = [
    {
      header: "File Name",
      cell: ({ row }) => <h6 className="">{row.original.title}</h6>,
    },
    {
      header: "File Url",
      cell: ({ row }) => <h6 className="">{row.original.fileUrl}</h6>,
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
      header: "category",
      cell: ({ row }) => (
        <h6 className="">
          {row.original.category ?? "No category"}
        </h6>
      ),
    },
    {
      header: "department",
      cell: ({ row }) => (
        <h6 className="">
          {row.original.department.name}
        </h6>
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
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout right={null}>
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
        title={<span className=" font-semibold"> {"Add Document"}</span>}
      >
        <AddUpdateDocument refetch={get} onClose={() => setShowDrawer(false)} />
      </Drawer>
      <Drawer
        opened={viewDoc.opened}
        onClose={() => setViewDoc({
          opened: false,
          data: null
        })}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Document Overview"}</span>}
      >
        <ViewDocument document={viewDoc.data} />
      </Drawer>
    </DashboardLayout>
  );
};

export default Documents;
