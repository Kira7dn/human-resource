import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { taskSchema } from "./_data/schema";

export const metadata: Metadata = {
  title: "Employees",
  description: "",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(main)/(route)/employee/_data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}
async function getEmployees() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/(main)/(route)/employee/_data/employees.json",
    ),
  );

  const tasks = JSON.parse(data.toString());
  return tasks;
  // return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const employees = await getEmployees();
  // generate random employees
  // const employees = Array.from({ length: 600 }, generateRandomEmployee);
  // // save the employees to a file
  // await fs.writeFile(
  //   path.join(
  //     process.cwd(),
  //     "app/(main)/(route)/employee/_data/employees.json",
  //   ),
  //   JSON.stringify(employees),
  // );

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
