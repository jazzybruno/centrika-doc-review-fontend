import TableSkeleton from "@/components/core/TableSkeleton";
import AddUpdateDocument from "@/components/dashboard/crud/AddUpdateDocument";
import ViewDocumentReview from "@/components/dashboard/crud/ViewDocumentReview";
import { DataTable } from "@/components/dashboard/data-table.tsx";
import { useAuth } from "@/contexts/AuthProvider";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IDocument } from "@/types/base.type";
import { getStatusColor } from "@/utils/funcs";
import {
  ActionIcon,
  Badge,
  Button,
  Drawer,
  SegmentedControl,
  Select,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const Documents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showDrawer, setShowDrawer] = React.useState(
    Boolean(searchParams.get("new"))
  );
  const [reqType, setReqType] = React.useState<string | null>(null);
  const [docType, setDocType] = React.useState("internal");
  const [isReviewing, setIsReviewing] = React.useState({
    opened: false,
    data: null as IDocument | null,
  });
  const [viewDoc, setViewDoc] = React.useState({
    opened: false,
    data: null as IDocument | null,
  });
  const [isEdit, setIsEdit] = React.useState({
    status: false,
    data: null as IDocument | null,
  });
  const { user } = useAuth();
  const {
    data: documents,
    get,
    loading,
    error,
  } = useGet<IDocument[]>(`/documents/by-user/${user?.id}`, {
    defaultData: [],
    // onMount: false,
  });
  const {
    data: revDoc,
    get: getRevDoc,
    loading: loadingRevDoc,
    error: errorRevDoc,
  } = useGet<IDocument[]>(
    reqType === "mine"
      ? `/documents/requested-by-me/${user?.id}`
      : reqType === "dept"
      ? `/documents/by-department/${user?.department.id}`
      : `/documents/requested-to-me/${user?.id}`,
    {
      defaultData: [],
      onMount: false,
    }
  );
  const [filteredList, setFilteredList] = React.useState(documents);

  const columns: ColumnDef<IDocument>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return <h6 className="">{row.original?.title}</h6>;
      },
    },
    {
      header: "File Url",
      cell: ({ row }) => {
        return <h6 className="">{row.original?.fileUrl}</h6>;
      },
    },
    {
      header: "Creator",
      cell: ({ row }) => (
        <h6 className=" whitespace-nowrap">
          {row.original?.createdBy?.username}
        </h6>
      ),
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
          {reqType === "mine" && (
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
        </div>
      ),
    },
  ];

  const onCloseDrawer = () => {
    setShowDrawer(false);
    setIsEdit({
      status: false,
      data: null,
    });
    // remove all query params
    setSearchParams({});
  };

  useEffect(() => {
    if (reqType === "mine" || reqType === "to-me" || reqType === "dept") {
      setFilteredList(revDoc);
      return;
    }
    if (docType === "All") {
      setFilteredList(documents);
      return;
    }
    const newDocuments = documents?.filter(
      (doc) => doc.category === docType.toUpperCase()
    );
    if (newDocuments) setFilteredList(newDocuments);
  }, [docType, documents, reqType, revDoc]);

  // reqType
  useEffect(() => {
    getRevDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqType]);

  const reqTypeData = [
    { value: "none", label: "None" },
    { value: "mine", label: "Mine" },
    { value: "to-me", label: "To Me" },
  ];
  const depTypeData = [
    ...reqTypeData,
    { value: "dept", label: "My Department" },
  ];
  const isDeptHead = user?.roles.some((r) => r.roleName === "DEPARTMENT_HEAD");
  return (
    <DashboardLayout
      right={
        <Button
          size="md"
          onClick={() => setShowDrawer(true)}
          radius={"md"}
          className=" duration-300"
        >
          Upload Document
        </Button>
      }
    >
      <div className="flex w-full mt-2 justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className=" px-2 text-sm font-medium">By Category</h1>
          <SegmentedControl
            w={300}
            onChange={(value) => setDocType(value)}
            data={[
              { value: "All", label: "All" },
              { value: "internal", label: "INTERNAL" },
              { value: "external", label: "EXTERNAL" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-y-1 px-3">
          <h1 className=" px-2 text-sm font-medium">By Review</h1>
          <Select
            data={isDeptHead ? depTypeData : reqTypeData}
            onChange={(val) => {
              setReqType(val);
            }}
            placeholder="Select Action"
          />
        </div>
      </div>
      <div className="flex w-full flex-col p-3">
        {loading || (loadingRevDoc && <TableSkeleton columns={columns} />)}
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
        {!loading && !loadingRevDoc && !error && (
          <DataTable
            searchKey="name"
            columns={columns}
            data={filteredList?.reverse()}
          />
        )}
      </div>
      <Drawer
        opened={showDrawer || isEdit.status}
        onClose={() => {
          onCloseDrawer();
        }}
        padding="md"
        size="md"
        position="right"
        closeOnClickOutside={false}
        title={
          <span className=" font-semibold">
            {isEdit ? "Edit/Upload Document" : "Upload Document"}
          </span>
        }
      >
        <AddUpdateDocument
          data={isEdit.data}
          isEdit={isEdit.status}
          refetch={get}
          onClose={() => {
            onCloseDrawer();
          }}
        />
      </Drawer>
      {(viewDoc.opened || isReviewing.opened) && (
        <ViewDocumentReview
          document={viewDoc.data ?? isReviewing.data}
          isReviewing={reqType === "to-me"}
          refresh={get}
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
        />
      )}
    </DashboardLayout>
  );
};

export default Documents;
