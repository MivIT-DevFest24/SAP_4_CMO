import {
  RowPagination,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Input } from "@/components/ui/input.jsx";
import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { useState } from "react";
import {
  useGetAllUsers,
  useModifyUserRole,
  useDeleteUser,
} from "@/hooks/react-query/useUser.js";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import PaginationTable from "./PaginationTable.jsx";

export const columns = [
  {
    accessorKey: "firstname",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "username",
    header: () => <div className="text-left"> Username</div>,

    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left">Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");

      return <div className="text-left font-medium">{role}</div>;
    },
  },
  {
    accessorKey: "sectors",
    header: () => <div className="text-left">Sector</div>,
    cell: ({ row }) => {
      const sectors = row.getValue("sectors");

      return <div className="text-left font-medium">{sectors}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const queryClient = useQueryClient();
      const modifyUserRole = useModifyUserRole();
      const deleteUser = useDeleteUser();
      const { toast } = useToast();
      const handleDelete = async (userId) => {
        try {
          const response = await deleteUser.mutateAsync(userId);
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
          queryClient.invalidateQueries({
            queryKey: ["AllUsers"],
          });
          queryClient.invalidateQueries({
            queryKey: ["Statistics"],
          });
          toast({
            description: response.message,
          });
        } catch (error) {
          toast({
            description: error.message,
            status: "error",
          });
        }
      };

      const handleToggleRole = async (userId, role) => {
        try {
          const response = await modifyUserRole.mutateAsync({ userId, role });
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
          queryClient.invalidateQueries({
            queryKey: ["AllUsers"],
          });
          queryClient.invalidateQueries({
            queryKey: ["Statistics"],
          });
          toast({
            variant: "success",
            description: response.message,
          });
        } catch (error) {
          toast({
            variant: "destructive",
            description: error.message,
            status: "error",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDelete(user._id);
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleToggleRole(
                  user._id,
                  user.role === "operator" ? "manager" : "operator"
                );
              }}
            >
              {user.role === "operator" ? "Make Manager" : "Make Operator"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserTable() {
  const { data, isLoading, error } = useGetAllUsers();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setpageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Include pagination model
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        initialPageIndex: pageIndex,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,

      pagination: {
        initialPageIndex: pageIndex,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    },
  });

  if (isLoading) {
    return (
      <div>
        <img src={loading_gif} alt="loading gif" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4 justify-between">
        <div className="w-[28rem]">
          <Input
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto dark:bg-black dark:border-neutral-800"
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto dark:bg-black dark:border-neutral-800"
              >
                Sort <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => {
                if (!column.getCanSort()) {
                  return null;
                }
                return (
                  <DropdownMenuItem
                    key={column.id}
                    onClick={() => {
                      column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                  >
                    {column.id}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      <div className="flex items-center justify-end space-x-2">
        <div className="space-x-2">
          <PaginationTable
            setpageIndex={setpageIndex}
            pageIndex={pageIndex}
            totalPages={parseInt(data.length / pageSize)}
            hasMore={parseInt(data.length / pageSize) > pageIndex}
          />
        </div>
      </div>
    </div>
  );
}
