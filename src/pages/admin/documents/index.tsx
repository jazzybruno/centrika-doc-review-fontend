import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDocument from "@/components/dashboard/crud/AddUpdateDocument";
import ViewDocument from "@/components/dashboard/crud/ViewDocument";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDocument } from "@/types/base.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import users from "../users";

const Documents = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewDoc, setViewDoc] = React.useState(false);
  const {
    data: documents,
    get,
    loading,
    error,
  } = useGet<IDocument[]>("/document/all", {
    defaultData: [],
  });

  const columns: ColumnDef<any>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row: any) => <h6 className="">{row.getValue("name")}</h6>,
    },
    {
      header: "Class",
      accessorKey: "class",
      cell: (row: any) => <h6 className="">{row.getValue("class")}</h6>,
    },
    {
      header: "Edit Marks",
      accessorKey: "class",
      cell: (row: any) => <h6 className="">{row.getValue("class")}</h6>,
    },
    {
      header: "Actions",
      accessorKey: "class",
      cell: (row: any) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon variant="transparent" onClick={() => setViewDoc(true)}>
            <FaEye />
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
