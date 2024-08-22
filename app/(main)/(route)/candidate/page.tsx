import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getAllCandidates } from "@/lib/actions/candidate.actions";

export const metadata: Metadata = {
  title: "Candidate",
  description: "",
};

export default async function CandidatePage() {
  const allCandidates = await getAllCandidates();

  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Candidate List</h2>
        </div>
        {allCandidates && <DataTable data={allCandidates} columns={columns} />}
      </div>
    </div>
  );
}
