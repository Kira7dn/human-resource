import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Payroll",
  description: "",
};

// Simulate a database read for tasks.
async function getPayrolls() {
  const data = await fs.readFile(
    path.join(process.cwd(), "constants/payroll/data.json"),
  );

  const payroll = JSON.parse(data.toString());
  return payroll;
}

export default async function TaskPage() {
  const payroll = await getPayrolls();

  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Payroll</h2>
        </div>
        {/* <DataTable data={payroll} columns={columns} /> */}
      </div>
    </div>
  );
}
