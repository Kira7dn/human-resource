"use client";

import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { AttendanceType, Employee } from "@/lib/validations";
import { cn, generateDatesForMonth } from "@/lib/utils";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AttendanceForm } from "./attendance-form";
import { useState } from "react";

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
          className="flex justify-center"
        />
      );
    },
    cell: ({ row }: { row: Row<AttendanceList> }) => {
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
                  cell_data.attendance_status === "work" && "bg-green-500",
                  cell_data.attendance_status === "paid_leave" &&
                    "bg-yellow-500",
                  cell_data.attendance_status === "unpaid_leave" &&
                    "bg-red-500",
                )}
                onClick={() => setOpen(true)}
              >
                {cell_data.attendance_status === "work" && cell_data.overtime}
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
                    <div>
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
                    </div>
                    <p className="text-small-regular">
                      <span>Overtime: </span>
                      <span className="">
                        {(cell_data.overtime || 0) + " hours"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    {date.toDateString()}
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <AttendanceForm
            open={open}
            setOpen={setOpen}
            attendance={row.original[date.toISOString()]}
          />
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  })),
];
