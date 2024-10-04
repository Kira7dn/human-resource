"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Payroll } from "@/types";
import { Employee, PayrollType } from "@/lib/validations";
import { cn, generateDatesForYear } from "@/lib/utils";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { PayrollDialog } from "./PayrollDialog";

const date_range = generateDatesForYear(2024);

type PayrollList = {
  employee: Employee;
} & Record<string, PayrollType>;

export const columns: ColumnDef<PayrollList>[] = [
  {
    accessorKey: "employee.name",
    id: "employee",
    header: ({ column }: { column: Column<PayrollList, unknown> }) => (
      <DataTableColumnHeader
        column={column}
        title="Employee"
        className="w-52 !text-base-semibold"
      />
    ),
    cell: ({ row }) => (
      <div className="truncate px-2">{row.original.employee.name}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  ...date_range.map((date) => ({
    accessorKey: date.toISOString(),
    header: ({ column }: { column: Column<PayrollList, unknown> }) => {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        month: "2-digit",
      }).format(date);
      return (
        <DataTableColumnHeader
          column={column}
          title={formattedDate}
          className="flex justify-center"
        />
      );
    },
    cell: ({ row }: { row: Row<PayrollList> }) => {
      const cell_data = row.original[date.toISOString()];
      const employee = row.original.employee;
      const [open, setOpen] = useState(false);
      return (
        <>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div
                className={cn(
                  "flex h-6 transform cursor-pointer items-center justify-center border border-gray-200 text-center text-tiny-medium transition-all duration-100 ease-in-out hover:scale-105 hover:font-bold hover:shadow-lg",
                  // cell_data.attendance_status === "work" && "bg-green-500",
                  // cell_data.attendance_status === "paid_leave" &&
                  //   "bg-yellow-500",
                  // cell_data.attendance_status === "unpaid_leave" &&
                  //   "bg-red-500",
                )}
                onClick={() => setOpen(true)}
              >
                {cell_data?.work_day || 0}
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col justify-between">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={employee.image} />
                    <AvatarFallback>
                      {employee.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <h4 className="max-w-40 truncate text-base-semibold">
                      {employee.name}
                    </h4>
                    {/* <div>
                      <span className="text-small-regular">Status: </span>
                      <Badge
                        className="capitalize"
                        variant={
                          cell_data.attendance_status === "work"
                            ? "default"
                            : cell_data.attendance_status === "paid_leave"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {cell_data.attendance_status}
                      </Badge>
                    </div> */}
                    <p className="text-small-regular">
                      <span>Work day: </span>
                      <span className="">
                        {(cell_data?.work_day || 0) + " days"}
                      </span>
                    </p>
                    <p className="text-small-regular">
                      <span>Overtime: </span>
                      <span className="">
                        {(cell_data?.overtime || 0) + " hours"}
                      </span>
                    </p>
                    <p className="text-small-regular">
                      <span>Paid leave: </span>
                      <span className="">
                        {(cell_data?.paid_leave || 0) + " days"}
                      </span>
                    </p>
                    <p className="text-small-regular">
                      <span>Unpaid leave: </span>
                      <span className="">
                        {(cell_data?.unpaid_leave || 0) + " days"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <PayrollDialog
            open={open}
            setOpen={setOpen}
            payroll={row.original[date.toISOString()]}
          />
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  })),
  // {
  //   accessorKey: "position",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Position" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[40px] truncate font-medium">
  //         {row.getValue("position")}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "department",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Department" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {row.getValue("department")}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "month",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Month" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {row.getValue("month")}
  //       </span>
  //     );
  //   },
  //   sortDescFirst: true,
  // },

  // {
  //   accessorKey: "income",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Income (VND)" />
  //   ),
  //   cell: ({ row }) => {
  //     const salary_hour = row.original.gross_salary / 24 / 8;
  //     const salary_overtime = salary_hour * row.original.overtime * 1.5;
  //     const salary_worked =
  //       row.original.gross_salary -
  //       (row.original.unpaid_leave * row.original.gross_salary) / 24;
  //     const income = salary_worked + salary_overtime;
  //     return (
  //       <span className="max-w-[200px] truncate font-medium">
  //         {Math.floor(income).toLocaleString("en-US")}
  //       </span>
  //     );
  //   },
  // },

  // {
  //   id: "action",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
