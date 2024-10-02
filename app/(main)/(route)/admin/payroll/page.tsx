import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getPayrollListByYear } from "@/lib/actions/payroll.actions";

export const metadata: Metadata = {
  title: "Payroll",
  description: "",
};

export default async function TaskPage() {
  const payroll = await getPayrollListByYear(2024);

  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Payroll</h2>
        </div>
        <DataTable data={payroll} columns={columns} />
      </div>
    </div>
  );
}
