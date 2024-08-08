"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Payroll } from "@/types";

export const columns: ColumnDef<Payroll>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const fallback_name = row.original.name.split(" ").map((n) => n[0]);
      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={row.original.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{fallback_name}</AvatarFallback>
          </Avatar>
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: "month",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Month" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("month")}
        </span>
      );
    },
  },
  {
    accessorKey: "gross_salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gross Salary" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {Math.floor(row.getValue("gross_salary")).toLocaleString("en-US")}
        </span>
      );
    },
  },
  {
    accessorKey: "allowance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Allowance" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {Math.floor(row.getValue("allowance")).toLocaleString("en-US")}
        </span>
      );
    },
  },
  {
    accessorKey: "days_worked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days Worked" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("days_worked")}
        </span>
      );
    },
  },
  {
    accessorKey: "unpaid_leave",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unpaid leave" />
    ),
    cell: ({ row }) => {
      const unpaid_leave = Math.floor(24 - row.original.days_worked);
      return (
        <span className="max-w-[200px] truncate font-medium">
          {unpaid_leave}
        </span>
      );
    },
  },
  {
    accessorKey: "overtime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Overtime (hour)" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("overtime")}
        </span>
      );
    },
  },
  {
    accessorKey: "overcome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Overcome (VND)" />
    ),
    cell: ({ row }) => {
      const salary_hour = row.original.gross_salary / 24 / 8;
      const salary_overtime = salary_hour * row.original.overtime * 1.5;
      const salary_worked = row.original.days_worked * 8 * salary_hour;
      const overcome = salary_worked + salary_overtime;
      return (
        <span className="max-w-[200px] truncate font-medium">
          {Math.floor(overcome).toLocaleString("en-US")}
        </span>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
