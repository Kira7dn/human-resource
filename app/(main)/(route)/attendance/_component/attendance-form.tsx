"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { SelectItem } from "@/components/ui/select";
import { attendance_status } from "@/constants";
import { CalendarIcon, CircleSlash } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import { IoAddCircle } from "react-icons/io5";

export function AttendanceForm({
  open,
  setOpen,
  attendance,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  attendance: AttendanceType;
}) {
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
  const date = attendance.date ? new Date(attendance.date) : new Date();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {new Date(attendance.date).toDateString()}{" "}
              </span>
            </div>
          </SheetTitle>
          <SheetDescription>
            Make changes to your attendance here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col space-y-6"
          >
            <ScrollArea className="max-h-[80vh]">
              <div className={`flex flex-col gap-6`}>
                <div className="flex justify-between">
                  <div className="basis-1/3 space-y-2">
                    <Avatar className="h-32 w-32 rounded-md object-cover">
                      <AvatarImage
                        src={
                          typeof attendance.employee === "object"
                            ? attendance.employee.image
                            : ""
                        }
                      />
                      <AvatarFallback className="h-full w-full text-heading4-bold font-light">
                        {typeof attendance?.employee === "object"
                          ? attendance.employee.name
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {typeof attendance?.employee === "object"
                        ? attendance.employee.name
                        : ""}{" "}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="attendance_status"
                      label="Status"
                      placeholder="Select"
                    >
                      {attendance_status.map((item, i) => (
                        <SelectItem key={i} value={item}>
                          <div className="flex cursor-pointer items-center gap-2">
                            <p className="capitalize">{item}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="overtime"
                      label="Overtime"
                      placeholder="Select"
                      type="number"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="id_scan_time"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="shad-input-label">
                        ID scan
                      </FormLabel>
                      {field.value.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <p>{new Date(item).toTimeString()}</p>
                          <Button
                            onClick={() => {
                              field.onChange([
                                ...field.value.slice(0, i),
                                ...field.value.slice(i + 1),
                              ]);
                            }}
                            variant="ghost"
                            size="icon"
                          >
                            <FcCancel className="h-6 w-6" />
                          </Button>
                        </div>
                      ))}
                      {/* add button to add new ID scan */}
                      <Button
                        onClick={() => {
                          field.onChange([...field.value, new Date()]);
                        }}
                        variant="ghost"
                        size="icon"
                      >
                        <IoAddCircle className="h-6 w-6" />
                      </Button>

                      <FormMessage className="shad-error" />
                    </FormItem>
                  )}
                />
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
      </SheetContent>
    </Sheet>
  );
}
