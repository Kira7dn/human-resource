import { Metadata } from "next";
import { getAttendanceListByMonth } from "@/lib/actions/attendance.actions";
import { DataTable } from "./_component/data-table";
import { columns } from "./_component/columns";

export const metadata: Metadata = {
  title: "Attendance",
  description: "",
};

export default async function CandidatePage() {
  const date_month = new Date(2024, 7, 1);
  const data = await getAttendanceListByMonth(date_month);

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Attendance</h2>
        </div>
        {data && <DataTable data={data} columns={columns} />}
      </div>
    </div>
  );
}
