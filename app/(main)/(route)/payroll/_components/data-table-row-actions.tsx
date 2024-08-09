"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { PayrollDialog } from "@/components/dialog/PayrollDialog";
import { Payroll } from "@/types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const payroll = row.original as Payroll;

  return (
    <PayrollDialog payroll={payroll}>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 text-secondary hover:text-primary data-[state=open]:bg-muted"
      >
        <Receipt className="h-6 w-6 " />
      </Button>
    </PayrollDialog>
  );
}
