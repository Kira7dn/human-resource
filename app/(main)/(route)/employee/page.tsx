import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { z } from "zod";
import { EmployeeValidation } from "@/lib/validations";

export const metadata: Metadata = {
  title: "Employees",
  description: "",
};

// Simulate a database read for tasks.
async function getEmployees() {
  const data = await fs.readFile(
    path.join(process.cwd(), "constants/employee/data.json"),
  );

  const employees = JSON.parse(data.toString());
  return z.array(EmployeeValidation).parse(employees);
}

export default async function TaskPage() {
  const employees = await getEmployees();
  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Employee List</h2>
        </div>
        <DataTable data={employees} columns={columns} />
      </div>
    </div>
  );
}
