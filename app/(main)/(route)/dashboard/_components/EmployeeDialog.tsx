"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EmployeeDialog({
  userId,
  type,
}: {
  userId?: string;
  type: "create" | "update";
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex gap-2 text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusCircle />
          <span className="text-base-semibold">Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {type} Employee profile
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] rounded-md">
          <EmployeeForm type="create" setOpen={setOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
