"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Payroll } from "@/types";
export const columns: ColumnDef<Payroll>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Employee" />
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
  // {
  //   accessorKey: "level",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Level" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {row.getValue("level")}
  //       </span>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[40px] truncate font-medium">
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
    sortDescFirst: true,
  },
  // {
  //   accessorKey: "unpaid_leave",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Unpaid leave" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {row.getValue("unpaid_leave")}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "overtime",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Overtime (hour)" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {row.getValue("overtime")}
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: "income",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Income (VND)" />
    ),
    cell: ({ row }) => {
      const salary_hour = row.original.gross_salary / 24 / 8;
      const salary_overtime = salary_hour * row.original.overtime * 1.5;
      const salary_worked =
        row.original.gross_salary -
        (row.original.unpaid_leave * row.original.gross_salary) / 24;
      const income = salary_worked + salary_overtime;
      return (
        <span className="max-w-[200px] truncate font-medium">
          {Math.floor(income).toLocaleString("en-US")}
        </span>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
