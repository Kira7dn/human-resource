import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { z } from "zod";
import { CandidateValidation } from "@/lib/validations";

export const metadata: Metadata = {
  title: "Candidate",
  description: "",
};

// Simulate a database read for tasks.
async function getCandidate() {
  const data = await fs.readFile(
    path.join(process.cwd(), "constants/candidate/data.json"),
  );

  const candidates = JSON.parse(data.toString());
  return z.array(CandidateValidation).parse(candidates);
}

export default async function CandidatePage() {
  const candidates = await getCandidate();
  return (
    <div className="">
      <div className="flex flex-col justify-start space-y-2 py-4">
        <div className="flex h-8 items-center justify-between space-y-2">
          <h2 className="text-large-semibold tracking-tight">Candidate List</h2>
        </div>
        <DataTable data={candidates} columns={columns} />
      </div>
    </div>
  );
}
