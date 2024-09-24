"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CandidateValidation } from "@/lib/validations";
import { Settings2 } from "lucide-react";
import { CandidateDialog } from "@/components/dialog/CandidateDialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const candidate = CandidateValidation.parse(row.original);

  return (
    <CandidateDialog candidate={candidate}>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    </CandidateDialog>
  );
}
