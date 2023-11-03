import AddUpdateUser from "@/components/dashboard/crud/AddUpdateUser";
import ViewUser from "@/components/dashboard/crud/ViewUser";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { FaEye } from "react-icons/fa";

const Users = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewUser, setViewUser] = React.useState(false);
  const columns: ColumnDef<any>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (row: any) => <h6 className="">{row.getValue("id")}</h6>,
    },
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
        <DataTable columns={columns} data={sampleData} />
      </div>
      <Drawer
        opened={showDrawer}
        onClose={() => setShowDrawer(false)}
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> {"Add User"}</span>}
      >
        <AddUpdateUser />
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
