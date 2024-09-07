"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui//form";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import SubmitButton from "../submit-btn";
import { Department, Recruit, RecruitValidation } from "@/lib/validations";
import { department, levels } from "@/constants";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui//scroll-area";
import { createRecruit, updateRecruit } from "@/lib/actions/recruit.actions";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { Spinner } from "../spinner";

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
  const [departmentdata, setDepartmentdata] = useState<Department[]>([]);
  const [isLoadingdata, setLoadingdata] = useState(true);
  useEffect(() => {
    getAllDepartments().then((data) => {
      if (data) {
        setDepartmentdata(data);
        setLoadingdata(false);
      }
    });
  }, []);

  const form = useForm<z.infer<typeof RecruitValidation>>({
    resolver: zodResolver(RecruitValidation),
    defaultValues: recruitment
      ? recruitment
      : {
          position: "",
          quantity: 0,
          expried_date: new Date(),
          level: "",
          salary: "",
          description: "",
          requirements: "",
          department: "",
        },
  });
  const onSubmit = async (values: z.infer<typeof RecruitValidation>) => {
    setIsLoading(true);
    if (recruitment?._id) {
      await updateRecruit(recruitment._id, values);
    } else {
      await createRecruit(values);
    }
    setIsLoading(false);
  };

  let buttonLabel = recruitment ? "Update Recruit" : "Submit Recruit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {recruitment ? "Edit" : "Create"} Recruit Information
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
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
                {/* query selection form field */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="flex-1 ">
                      <FormLabel className="shad-input-label ">
                        Department
                      </FormLabel>
                      <FormControl>
                        {isLoadingdata ? (
                          <Spinner />
                        ) : (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              typeof field.value === "string"
                                ? field.value
                                : field.value._id
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="h-11 border-dark-500 bg-card placeholder:text-dark-600 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-dark-500 bg-card">
                              {departmentdata &&
                                departmentdata.map((item: Department) => (
                                  <SelectItem
                                    key={item._id}
                                    value={item._id || "0"}
                                  >
                                    <div className="flex cursor-pointer items-center gap-2">
                                      <p className="capitalize">{item.name}</p>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      </FormControl>
                      <FormMessage className="shad-error" />
                    </FormItem>
                  )}
                />
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
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="description"
                label="Description"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="requirements"
                label="Requirements"
              />

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
