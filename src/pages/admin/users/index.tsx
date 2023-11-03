import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateUser from "@/components/dashboard/crud/AddUpdateUser";
import ViewUser from "@/components/dashboard/crud/ViewUser";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IUser } from "@/types/user.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const Users = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewUser, setViewUser] = React.useState(false);
  const {
    data: users,
    loading,
    error,
    get,
  } = useGet<IUser[]>("/users/all", {
    defaultData: [],
  });

  const columns: ColumnDef<IUser>[] = [
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
    },
    {
      header: "Actions",
      accessorKey: "class",
      cell: (row: any) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon variant="transparent" onClick={() => setViewUser(true)}>
            <FaEye />
          </ActionIcon>
        </div>
      ),
    },
  ];
  const sampleData = [
    { id: 1, name: "John Doe", class: "Maths" },
    { id: 2, name: "Jane Smith", class: "Science" },
    { id: 3, name: "Michael Johnson", class: "English" },
    { id: 4, name: "Emily Davis", class: "History" },
    { id: 5, name: "David Wilson", class: "Geography" },
    { id: 6, name: "Sarah Thompson", class: "Physics" },
    { id: 7, name: "Daniel Anderson", class: "Chemistry" },
    { id: 8, name: "Olivia Martinez", class: "Biology" },
    { id: 9, name: "James Taylor", class: "Computer Science" },
    { id: 10, name: "Sophia Hernandez", class: "Art" },
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
          + Add User
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
          <DataTable columns={columns} data={users} />
        )}
      </div>
      <Drawer
        opened={showDrawer}
        onClose={() => setShowDrawer(false)}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Add User"}</span>}
      >
        <AddUpdateUser refetch={get} onClose={() => setShowDrawer(false)} />
      </Drawer>
      <Drawer
        opened={viewUser}
        onClose={() => setViewUser(false)}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> </span>}
      >
        <ViewUser />
      </Drawer>
    </DashboardLayout>
  );
};

export default Users;
