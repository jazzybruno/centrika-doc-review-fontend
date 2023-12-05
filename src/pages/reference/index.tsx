import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateReferenceNumber from "@/components/dashboard/crud/AddUpdateReferenceNumber";
import ViewReferenceNumber from "@/components/dashboard/crud/ViewReferenceNumber";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IReferenceNumber } from "@/types/base.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const ReferenceNumbers = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewReferenceNumber, setViewReferenceNumber] = React.useState({
    open: false,
    data: null as any,
  });
  const {
    data: referenceNumbers,
    loading,
    error,
    get,
  } = useGet<IReferenceNumber[]>("/reference-numbers", {
    defaultData: [],
  });
  const [isEdit, setIsEdit] = React.useState({
    status: false,
    data: null as IReferenceNumber | null,
  });

  const columns: ColumnDef<IReferenceNumber>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (row: any) => <h6 className="">{row.getValue("title")}</h6>,
    },
    {
      header: "Destination",
      accessorKey: "destination",
      cell: (row: any) => <h6 className="">{row.getValue("destination")}</h6>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: any) => <h6 className="">{row.getValue("status")}</h6>,
    },
    {
      header: "Created By",
      accessorKey: "createdBy",
      cell: (row: any) => (
        <h6 className="">{row.getValue("createdBy").username}</h6>
      ),
    },
    {
      header: "Actions",
      accessorKey: "class",
      cell: (row) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            variant="transparent"
            onClick={() =>
              setViewReferenceNumber({
                open: true,
                data: row.row.original,
              })
            }
          >
            <FaEye />
          </ActionIcon>
          {/* Uncomment the below code if you want to enable editing
          <ActionIcon
            variant="transparent"
            color="black"
            onClick={() =>
              setIsEdit({
                status: true,
                data: row.row.original,
              })
            }
          >
            <BiEdit />
          </ActionIcon>
          */}
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
          + Add Reference Number
        </Button>
      }
    >
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
        {!loading && !error && (
          <DataTable
            searchKey="name"
            columns={columns}
            data={referenceNumbers}
          />
        )}
      </div>
      <Drawer
        opened={showDrawer || isEdit.status}
        onClose={() => {
          setShowDrawer(false);
          setIsEdit({ status: false, data: null });
        }}
        padding="md"
        size="md"
        position="right"
        title={
          <span className=" font-semibold">
            {isEdit.status ? "Update Reference Number" : "Add Reference Number"}
          </span>
        }
      >
        <AddUpdateReferenceNumber
          refetch={get}
          onClose={() => {
            setShowDrawer(false);
            setIsEdit({ status: false, data: null });
          }}
        />
      </Drawer>
      <Drawer
        opened={viewReferenceNumber.open}
        onClose={() =>
          setViewReferenceNumber({
            open: false,
            data: null as any,
          })
        }
        padding="md"
        size="md"
        position="right"
        title={
          <span className=" font-semibold"> {"Reference Number Overview"}</span>
        }
      >
        <ViewReferenceNumber referenceNumber={viewReferenceNumber.data} />
      </Drawer>
    </DashboardLayout>
  );
};

export default ReferenceNumbers;
