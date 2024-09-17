"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { AttendanceType, AttendanceValidate } from "@/lib/validations";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubmitButton from "@/components/submit-btn";
import {
  createAttendance,
  updateAttendance,
} from "@/lib/actions/attendance.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AttendanceForm = ({
  attendance,
}: {
  attendance?: AttendanceType;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AttendanceValidate>>({
    resolver: zodResolver(AttendanceValidate),
    defaultValues: attendance,
  });
  const onSubmit = async (values: z.infer<typeof AttendanceValidate>) => {
    setIsLoading(true);
    const promise = attendance?._id
      ? updateAttendance({ _id: attendance._id, ...values })
      : createAttendance(values);
    toast.promise(promise, {
      loading: attendance?._id ? "Updating..." : "Creating...",
      success: () => {
        setIsLoading(false);
        return attendance?._id ? "Updated" : "Created" + " successfully!";
      },
      error: "Failed to " + attendance?._id ? "create" : "update",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <ScrollArea className="max-h-[80vh]">
          <div className={`flex flex-col gap-6 md:flex-row`}>
            <div className="basis-1/3 space-y-2">
              <Avatar className="h-32 w-32 rounded-md object-cover">
                <AvatarImage
                  src={
                    typeof attendance?.employee === "object"
                      ? attendance.employee.image
                      : ""
                  }
                />
                <AvatarFallback className="h-full w-full text-heading4-bold font-light">
                  {typeof attendance?.employee === "object"
                    ? attendance?.employee.name
                    : ""}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </ScrollArea>
        <SubmitButton
          isLoading={isLoading}
          className={`shad-primary-btn w-full`}
        >
          {attendance ? "Update Attendance" : "Submit Attendance"}
        </SubmitButton>
      </form>
    </Form>
  );
};
