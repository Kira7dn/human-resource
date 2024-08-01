"use client";

import { ColumnDef } from "@tanstack/react-table";
import { levels, statuses } from "../_data/data";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/lib/validations";

export const columns: ColumnDef<Employee>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const level = levels.find((level) => level.value === row.original.level);

      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("gender")}
        </span>
      );
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("level")}
        </span>
      );
    },
  },

  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("position")}
        </span>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("department")}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("email")}
        </span>
      );
    },
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Birth date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("birthDate")}
        </span>
      );
    },
  },
  {
    accessorKey: "hired_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hired date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("hired_date")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("address")}
        </span>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
