'use client';
import { Input, Pagination, Select } from '@mantine/core';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
interface Props {
  data: any;
  columns: ColumnDef<any>[];
  searchKey?: string;
  searchElement?: React.ReactNode;
  paginationProps?: any;
  actionElement?: React.ReactNode;
  minW?: string;
  tableClass?: string;
  renderCustomElement?: (table: Table<any>) => React.ReactNode;
}

export function DataTable({
  data,
  columns,
  searchKey,
  searchElement,
  paginationProps,
  actionElement,
  minW,
  tableClass,
  renderCustomElement,
}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: paginationProps?.paginateOpts.page ?? 0,
    pageSize: paginationProps?.paginateOpts.limit ?? 10,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const newColumns: ColumnDef<any>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(value) => table.toggleAllPageRowsSelected(!!value.target.checked)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className=" mx-auto"
          checked={row.getIsSelected()}
          onChange={(value) => {
            row.toggleSelected(!!value.target.checked);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // numbering column
    {
      id: 'numbering',
      header: '#',
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: newColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    debugTable: true,
    onPaginationChange: setPagination,
    manualPagination: paginationProps?.isPaginated,
    // pageCount: pageCount ?? ,
    // paginateExpandedRows: true,
  });
  const isPaginated = paginationProps?.isPaginated ?? false;

  const onPaginate = (page: number) => {
    if (isPaginated) {
      paginationProps?.setPaginateOpts({
        ...paginationProps?.paginateOpts,
        page,
      });
      return;
    }
    table?.setPageIndex(page);
  };

  return (
    <div className="w-full text-sm">
      {renderCustomElement && renderCustomElement(table)}
      <div className="flex w-full justify-between gap-x-2">
        <div className="flex w-full items-center py-4">
          {searchElement ? (
            searchElement
          ) : searchKey ? (
            <Input
              type="text"
              placeholder={`Search ${searchKey}...`}
              value={(table?.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(event) => table?.getColumn(searchKey)?.setFilterValue(event.target.value)}
              className="lg:max-w-xs max-w-[16em] w-full rounded-md duration-300"
            />
          ) : null}
        </div>
        {actionElement && actionElement}
      </div>
      <div className={` w-full overflow-auto ${tableClass}`}>
        <table style={{ minWidth: minW ?? 700 }} className=" w-full ">
          <thead className=" text-mainPurple">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className=" bg-[#EDEEF3]" key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <td className="p-2 font-semibold py-3 whitespace-nowrap" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row, i) => (
                <tr
                  className={`rounded-md overflow-hidden ${
                    i % 2 !== 0 ? 'bg-[#4343430f]' : 'bg-[#43434308]'
                  }  border-2 border-[#F7F8FD]`}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td
                      className={clsx(
                        `p-2 py-3`,
                        row.getIsSelected() ? 'bg-mainPurple text-white font-semibold' : '',
                        i === 0 && 'rounded-l-xl',
                        i === row.getVisibleCells().length - 1 && 'rounded-r-xl',
                      )}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table?.getFilteredSelectedRowModel().rows.length} of{' '}
          {table?.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Pagination
          total={
            isPaginated ? paginationProps?.paginateOpts?.totalPages ?? 1 : table?.getPageCount()
          }
          onNextPage={() => {
            if (isPaginated) {
              paginationProps?.setPaginateOpts({
                ...paginationProps?.paginateOpts,
                page: (paginationProps?.paginateOpts?.page ?? 0) + 1,
              });
              return;
            }
            table?.nextPage();
          }}
          value={
            isPaginated
              ? (paginationProps?.paginateOpts?.page ?? 0) + 1
              : table?.getState().pagination.pageIndex + 1
          }
          onPreviousPage={() => {
            if (isPaginated) {
              paginationProps?.setPaginateOpts({
                ...paginationProps?.paginateOpts,
                page: (paginationProps?.paginateOpts?.page ?? 0) - 1,
              });
              return;
            }
            table?.previousPage();
          }}
          onChange={(page) => {
            console.log(page);
            onPaginate(page - 1);
          }}
        />
      </div>
      <div className="flex sm:flex-row flex-col text-sm items-center mt-3 gap-2 justify-center">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {isPaginated
              ? (paginationProps?.paginateOpts.page ?? 0) + 1
              : table?.getState().pagination.pageIndex + 1}
            of {isPaginated ? paginationProps?.paginateOpts.totalPages : table?.getPageCount()}
          </strong>
        </span>
        <div className="flex items-center gap-x-2">
          <span>Show</span>
          <Select
            size="xs"
            // label="Your favorite library"
            placeholder="Pick Page Size"
            data={[5, 10, 20, 30, 40, 50].map((val) => String(`${val}`))}
            value={
              isPaginated
                ? String(paginationProps?.paginateOpts?.limit ?? 0)
                : table?.getState().pagination.pageSize.toString()
            }
            onChange={(value) => {
              // remove 'show' from value and
              const newValue = value?.replace('', '');
              if (!newValue) return;
              if (isPaginated) {
                paginationProps?.setPaginateOpts({
                  ...paginationProps?.paginateOpts,
                  limit: Number(newValue),
                });
                return;
              }
              table?.setPageSize(Number(newValue));
            }}
          />
        </div>
      </div>
    </div>
  );
}
