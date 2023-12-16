import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateReferenceNumber from "@/components/dashboard/crud/AddUpdateReferenceNumber";
import ViewReferenceNumber from "@/components/dashboard/crud/ViewReferenceNumber";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import { useAuth } from "@/contexts/AuthProvider";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IReferenceNumber } from "@/types/base.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const ReferenceNumbers = () => {
  const { user } = useAuth();
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewReferenceNumber, setViewReferenceNumber] = React.useState({
    open: false,
    data: null as any,
  });
  const isAdmin = user?.roles.some((role) => role.roleName === "ADMIN");
  const {
    data: referenceNumbers,
    loading,
    error,
    get,
  } = useGet<IReferenceNumber[]>(
    `${
      !isAdmin ? `/reference-numbers/by-user/${user?.id}` : `/reference-numbers`
    }`,
    {
      defaultData: [],
    }
  );
  const [isEdit, setIsEdit] = React.useState({
    status: false,
    data: null as IReferenceNumber | null,
  });
  const { deleteData, loading: loadingDelete } = useDelete(
    `/reference-numbers`,
    {
      customError:
        "You cannot delete this reference number because it is expired/not the latest reference number.",
    }
  );
  const [showDelete, setShowDelete] = React.useState({
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
      header: "Reference Number",
      accessorKey: "referenceNumber",
      cell: (row: any) => (
        <h6 className="">{row.getValue("referenceNumber")}</h6>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <h6 className="">
          {new Date(row.getValue("createdAt")).toUTCString()}
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
            onClick={() =>
              setViewReferenceNumber({
                open: true,
                data: row.row.original,
              })
            }
          >
            <FaEye />
          </ActionIcon>
          {/* Uncomment the below code if you want to enable editing */}
          {isAdmin && (
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
          )}
          {/* Uncomment the below code if you want to enable deleting */}
          {isAdmin && (
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => {
                setShowDelete({
                  status: true,
                  data: row.row.original,
                });
              }}
            >
              <BiTrashAlt />
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
          + Book Reference Number
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
            searchKey="..."
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
          referenceNumber={isEdit.data}
          isEdit={isEdit.status}
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
      {/* delete modal */}
      <MainModal
        isOpen={showDelete.status}
        onClose={() =>
          setShowDelete({
            status: false,
            data: null,
          })
        }
        title="Delete Reference Number"
        // className="w-full md:w-1/2"
      >
        <div className="flex flex-col gap-y-3">
          <p className="text-sm">
            Are you sure you want to delete this reference number?
          </p>
          <div className="flex w-full gap-x-3">
            <Button
              onClick={() =>
                setShowDelete({
                  status: false,
                  data: null,
                })
              }
              variant="outline"
              color="gray"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await deleteData(showDelete.data?.id as string);
                get();
                setShowDelete({
                  status: false,
                  data: null,
                });
              }}
              loading={loadingDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </MainModal>
    </DashboardLayout>
  );
};

export default ReferenceNumbers;
