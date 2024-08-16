"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";

import { Form } from "@/components/ui//form";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import SubmitButton from "../submit-btn";
import { Recruit, RecruitValidation } from "@/lib/validations";
import { department, levels } from "@/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui//scroll-area";

export const RecruitDialog = ({
  recruitment,
  children,
}: {
  recruitment?: Recruit;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RecruitValidation>>({
    resolver: zodResolver(RecruitValidation),
    defaultValues: recruitment
      ? recruitment
      : {
          position: "",
          department: "",
          quantity: 0,
          expried_date: new Date(),
          level: "",
          salary: "",
          description: "",
          requirement: "",
        },
  });
  const onSubmit = async (values: z.infer<typeof RecruitValidation>) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  let buttonLabel = recruitment ? "Update Recruit" : "Submit Recruit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {recruitment ? "Edit" : "Create"} Candidate profile
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] rounded-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-6"
            >
              <div className={`flex flex-col gap-6 md:flex-row`}>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="position"
                  label="Position"
                  placeholder="Frontend Developer"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="department"
                  label="Department"
                  placeholder="Select"
                >
                  {department.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p className="capitalize">{item}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <div className={`flex flex-col gap-6 md:flex-row`}>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="quantity"
                  label="Quantity"
                  type="number"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="salary"
                  label="Salary"
                  placeholder="Input salary"
                />
              </div>
              <div className={`flex flex-col gap-6 md:flex-row`}>
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="expried_date"
                  label="Expried date"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="level"
                  label="Level"
                  placeholder="Select"
                >
                  {levels.map((item, i) => (
                    <SelectItem key={i} value={item.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <item.icon />
                        <p className="capitalize">{item.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <div className={`flex flex-col gap-6 md:flex-row`}></div>

              <SubmitButton
                isLoading={isLoading}
                className={`shad-primary-btn w-full`}
              >
                {buttonLabel}
              </SubmitButton>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
