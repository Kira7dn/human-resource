"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AttendanceType, AttendanceValidate } from "@/lib/validations";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubmitButton from "@/components/submit-btn";
import { updateAttendanceById } from "@/lib/actions/attendance.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { SelectItem } from "@/components/ui/select";
import { attendance_status } from "@/constants";
import { CalendarIcon, CircleSlash, XCircle, XSquare } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import Image from "next/image";

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
    const promise = updateAttendanceById(values._id ?? "", values);
    toast.promise(promise, {
      loading: "Updating...",
      success: () => {
        setIsLoading(false);
        setOpen(false);
        return "Updated successfully";
      },
      error: "Failed to update",
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
                          ? attendance.employee.name.split(" ")[0][0] +
                            " " +
                            attendance.employee.name.split(" ")[1][0]
                          : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mx-auto text-center">
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
                      <div className="flex flex-col gap-2">
                        {field.value.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-small-medium"
                          >
                            <p>{new Date(item).toLocaleString()}</p>
                            <div
                              onClick={() => {
                                field.onChange([
                                  ...field.value.slice(0, i),
                                  ...field.value.slice(i + 1),
                                ]);
                              }}
                              className="cursor-pointer "
                            >
                              <XCircle className="h-5 w-5 text-gray-500 hover:text-red-500" />
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center rounded-md border border-dark-500 bg-card">
                          <div className="flex flex-row">
                            <Image
                              src="/assets/icons/calendar.svg"
                              height={24}
                              width={24}
                              alt="calendar"
                              className="ml-2 bg-card"
                            />
                            <ReactDatePicker
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={1}
                              selected={date}
                              onChange={(date: Date) =>
                                field.onChange([...field.value, date])
                              }
                              dateFormat="MM/dd/yyyy h:mm aa"
                              wrapperClassName="date-picker"
                            />
                          </div>
                        </div>
                      </div>
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
