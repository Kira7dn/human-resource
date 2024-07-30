import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { taskSchema } from "./_data/schema";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(main)/(route)/employee/_data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Employee List</h2>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </div>
  );
}
