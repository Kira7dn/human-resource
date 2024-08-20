import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { z } from "zod";
import { EmployeeValidation } from "@/lib/validations";
import { getAllEmployees } from "@/lib/actions/employee.actions";

export const metadata: Metadata = {
  title: "Employees",
  description: "",
};

export default async function TaskPage() {
  const allEmployees = await getAllEmployees();

  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Employee List</h2>
        </div>
        <DataTable data={allEmployees} columns={columns} />
      </div>
    </div>
  );
}
