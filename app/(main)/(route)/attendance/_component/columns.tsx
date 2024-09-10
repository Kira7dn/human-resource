"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { AttendanceType, Employee } from "@/lib/validations";
import { cn, generateDatesForMonth } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";

const date_month = new Date(2024, 7, 1);
const date_range = generateDatesForMonth(date_month);

type AttendanceList = {
  employee: Employee;
} & Record<string, AttendanceType>;

export const columns: ColumnDef<AttendanceList>[] = [
  {
    accessorKey: "employee.name",
    header: ({ column }: { column: Column<AttendanceList, unknown> }) => (
      <DataTableColumnHeader
        column={column}
        title="Employee"
        className="!text-base-semibold"
      />
    ),
    cell: ({ row }) => (
      <div className="w-40 truncate px-2">{row.original.employee.name}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  ...date_range.map((date) => ({
    accessorKey: date.toISOString(),
    header: ({ column }: { column: Column<AttendanceList, unknown> }) => {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
      }).format(date);
      return (
        <DataTableColumnHeader
          column={column}
          title={formattedDate}
          className=""
        />
      );
    },
    cell: ({ row }: { row: Row<AttendanceList> }) => {
      const cell_data = row.original[date.toISOString()];
      return (
        <div
          className={cn(
            "flex h-6 transform cursor-pointer items-center justify-center border border-gray-200 text-center text-tiny-medium transition-all duration-100 ease-in-out hover:scale-105 hover:font-bold hover:shadow-lg",
            // cell_data.attendance_status === "work" &&
            //   "bg-green-500",
            cell_data.attendance_status === "paid_leave" && "bg-yellow-500",
            cell_data.attendance_status === "unpaid_leave" && "bg-red-500",
          )}
        >
          {cell_data.attendance_status === "work" && cell_data.overtime}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  })),
];
