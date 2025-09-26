"use client";

import * as React from "react";
import {
  IconAlertCircleFilled,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconDotsVertical,
  IconLoader,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDisclosure, User } from "@heroui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@heroui/react";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { Attendance } from "@/types/types";
import { format } from "date-fns";

export const attendanceSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  name: z.string().trim().min(1, {
    message: "Attendance name is required.",
  }),
  role: z.string().trim().min(1, { message: "Role is required." }),
  date: z.string().trim().min(1, { message: "Attendance date is required." }),
  checkInTime: z
    .string()
    .trim()
    .min(1, { message: "Attendance check-in time is required." }),
  checkOutTime: z
    .string()
    .trim()
    .min(1, { message: "Attendance check-out time is required." }),
  status: z
    .string()
    .trim()
    .min(1, { message: "Attendance status is required." }),
});

function CustomTableRow({
  row,
}: {
  row: Row<z.infer<typeof attendanceSchema>>;
}) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function AttendanceTable({
  data: initialData,
}: {
  data: z.infer<typeof attendanceSchema>[];
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<Attendance | null>(
    null
  );
  const handleOpenModal = (item: Attendance) => {
    setSelectedItem(item);
    onOpen();
  };
  const handleDelete = (id: number | undefined) => {
    console.log("Delete item with id:", id);
    onClose();
  };

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<z.infer<typeof attendanceSchema>>[] = [
    {
      accessorKey: "id",
      header: () => <div className="w-full text-center">ID</div>,
      cell: ({ row }) => (
        <p className="min-w-8 text-center">{row.original.id}</p>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <User
            classNames={{
              name: "font-semibold text-default-600",
            }}
            avatarProps={{
              radius: "lg",
              src: row.original.name,
              showFallback: true,
              name: getInitials(row.original.name),
            }}
            name={row.original.name}
          >
            {row.original.name}
          </User>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="w-32">
          {row.original.role == "HR" ? (
            <Badge variant="default" className="px-1.5">
              {row.original.role}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {row.original.role}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => <div className="w-full">Date</div>,
      cell: ({ row }) => (
        <p>{format(new Date(row.original.date), "dd MMMM yyyy")}</p>
      ),
    },
    {
      accessorKey: "checkInTime",
      header: () => <div className="w-full">Check-In</div>,
      cell: ({ row }) => (
        <p className="font-semibold">
          {row.original?.checkInTime
            ? format(new Date(row.original.checkInTime), "HH:mm")
            : "-"}
        </p>
      ),
    },
    {
      accessorKey: "checkOutTime",
      header: () => <div className="w-full">Check-Out</div>,
      cell: ({ row }) => (
        <p className="font-semibold">
          {row.original?.checkOutTime
            ? format(new Date(row.original.checkOutTime), "HH:mm")
            : "-"}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Present" ? (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          ) : row.original.status === "Late" ? (
            <IconAlertCircleFilled className="fill-yellow-500 dark:fill-green-400" />
          ) : row.original.status === "Absent" ? (
            <IconCircleXFilled className="fill-red-500 dark:fill-green-400" />
          ) : (
            <IconLoader />
          )}
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/attendances/details/${row.original.id}`}>
                View Attendance Details
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href={`/dashboard/attendances/edit/${row.original.id}`}>
                View {getPossessive(row.original.name)} Full Attendances
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row?.id?.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center gap-4">
        <Input
          variant="bordered"
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <CustomTableRow key={row.id} row={row} />
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit ms-auto">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
