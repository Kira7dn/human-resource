"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { EmployeeValidation } from "@/lib/validations";
import { EmployeeDialog } from "@/components/dialog/EmployeeDialog";
import { Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const employee = EmployeeValidation.parse(row.original);

  return (
    <EmployeeDialog employee={employee}>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Settings2 className="h-4 w-4" />
      </Button>
    </EmployeeDialog>
  );
}
