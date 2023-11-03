import DeleteForm from "@/components/core/DeleteForm";
import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateUser from "@/components/dashboard/crud/AddUpdateUser";
import ViewUser from "@/components/dashboard/crud/ViewUser";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IUser } from "@/types/user.type";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "lucide-react";
import React, { useState } from "react";
import { AiFillEye, AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const Users = () => {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [viewUser, setViewUser] = React.useState({
    open: false,
    data: null as any,
  });
  const [isEdit, setIsEdit] = useState({
    status: false,
    data: null as IUser | null,
  });
  const [isDelete, setIsDelete] = useState({
    status: false,
    data: null as IUser | null,
  });
  const { deleteData, loading: deleteLoading } = useDelete("/users/delete");

  const onEdit = (data: IUser) => {
    setIsEdit({
      status: true,
      data,
    });
  };

  const onDelete = (data: IUser) => {
    setIsDelete({
      status: true,
      data,
    });
  };

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
      cell: ({ row }: any) => (
        <div className="flex items-center gap-x-3">
          <ActionIcon
            variant="transparent"
            color="black"
            onClick={() =>
              setViewUser({
                open: true,
                data: row.original,
              })
            }
          >
            <AiOutlineEye />
          </ActionIcon>
          <ActionIcon
            onClick={() => onEdit(row.original)}
            variant="transparent"
            color="blue"
            radius="xl"
          >
            <BiEdit />
          </ActionIcon>
          <ActionIcon
            onClick={() => onDelete(row.original)}
            variant="transparent"
            color="red"
            radius="xl"
          >
            <BiTrash />
          </ActionIcon>
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
        {!loading && !error && <DataTable columns={columns} data={users} />}
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
            {isEdit ? "Edit User" : "Add User"}
          </span>
        }
      >
        <AddUpdateUser
          user={isEdit.data}
          isEdit={isEdit.status}
          refetch={get}
          onClose={() => setShowDrawer(false)}
        />
      </Drawer>
      <Drawer
        opened={viewUser.open}
        onClose={() =>
          setViewUser({
            open: false,
            data: null as any,
          })
        }
        padding="md"
        size="md"
        position="right"
        title={<span className=" font-semibold"> </span>}
      >
        <ViewUser user={viewUser.data} />
      </Drawer>
      <MainModal
        size={"lg"}
        isOpen={isDelete.status}
        title="Delete Course"
        onClose={() => setIsDelete({ status: false, data: null })}
      >
        <DeleteForm
          onCancel={() => setIsDelete({ status: false, data: null })}
          onDelete={() => {
            deleteData(isDelete.data?.id);
            setIsDelete({ status: false, data: null });
            get();
          }}
          title={isDelete.data?.username}
          loading={deleteLoading}
        />
      </MainModal>
    </DashboardLayout>
  );
};

export default Users;
