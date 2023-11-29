import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDepartment from "@/components/dashboard/crud/AddUpdateDepartment";
import ViewDepartment from "@/components/dashboard/crud/ViewDepartment";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDepartment } from "@/types/base.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const Departments = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewDepartment, setViewDepartment] = React.useState({
    open: false,
    data: null as any,
  });
  const {
    data: departments,
    loading,
    error,
    get,
  } = useGet<IDepartment[]>("/department/all", {
    defaultData: [],
  });
  const [isEdit, setIsEdit] = React.useState({
    status: false,
    data: null as IDepartment | null,
  });

  const columns: ColumnDef<IDepartment>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row: any) => <h6 className="">{row.getValue("name")}</h6>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row: any) => <h6 className="">{row.getValue("description")}</h6>,
    },
    {
      header: "Created By",
      accessorKey: "createdByUser",
      cell: (row: any) => (
        <h6 className="">{row.getValue("createdByUser").username}</h6>
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
              setViewDepartment({
                open: true,
                data: row.row.original,
              })
            }
          >
            <FaEye />
          </ActionIcon>
          {/* <ActionIcon
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
          </ActionIcon> */}
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
          + Add Department
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
          <DataTable searchKey="name" columns={columns} data={departments} />
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
            {isEdit.status ? "Update Department" : "Add Department"}
          </span>
        }
      >
        <AddUpdateDepartment
          refetch={get}
          onClose={() => {
            setShowDrawer(false);
            setIsEdit({ status: false, data: null });
          }}
        />
      </Drawer>
      <Drawer
        opened={viewDepartment.open}
        onClose={() =>
          setViewDepartment({
            open: false,
            data: null as any,
          })
        }
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Department Overview"}</span>}
      >
        <ViewDepartment department={viewDepartment.data} />
      </Drawer>
    </DashboardLayout>
  );
};

export default Departments;
