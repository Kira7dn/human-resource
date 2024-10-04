"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
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
import { genders, levels, statuses } from "@/constants";
import { Label } from "@/components/ui//label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { Spinner } from "../spinner";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { createEmployee, updateEmployee } from "@/lib/actions/employee.actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui//radio-group";
import { Department, Employee, EmployeeValidation } from "@/lib/validations";
import SingleImageUpload from "../upload/single-image";
import { toast } from "sonner";

export const EmployeeDialog = ({
  employee,
  children,
}: {
  employee?: Employee;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
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

  const form = useForm<z.infer<typeof EmployeeValidation>>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: employee
      ? employee
      : {
          name: "",
          position: "",
          level: "",
          department: "",
          birthDate: new Date("1990/1/1"),
          hired_date: new Date(Date.now()),
          status: "Active",
        },
  });
  const onSubmit = async (values: z.infer<typeof EmployeeValidation>) => {
    setIsLoading(true);
    const promise = employee?._id
      ? updateEmployee(employee._id, values)
      : createEmployee(values);
    toast.promise(promise, {
      loading: employee?._id ? "Updating..." : "Creating...",
      success: () => {
        setIsLoading(false);
        setOpen(false);
        return employee?._id ? "Updated" : "Created" + " successfully!";
      },
      error: "Failed to " + employee?._id ? "create" : "update",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {employee ? "Edit" : "Create"} Employee profile
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-4"
          >
            <div className={`flex flex-col gap-6 md:flex-row`}>
              <div className="basis-1/3 space-y-2">
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="image"
                  label="Avatar"
                  renderSkeleton={(field) => (
                    <div className="flex w-full items-center justify-center gap-4">
                      <FormControl className="flex-1 text-base-semibold text-secondary">
                        <SingleImageUpload
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          height={140}
                          width={140}
                          image={field.value}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Name"
                  // iconSrc="assets/icons/user.svg"
                  iconNode={FaRegUser}
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="gender"
                  label="Gender"
                  placeholder="Select"
                >
                  {genders.map((item, i) => (
                    <SelectItem key={i} value={item.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <item.icon />
                        <p className="capitalize">{item.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="birthDate"
                  label="Birth date"
                  iconNode={FaRegCalendarAlt}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between ">
                <div className="space-y-2">
                  <div className="flex flex-col gap-3 md:flex-row">
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
                                {isLoadingdata ? (
                                  <Spinner />
                                ) : (
                                  departmentdata &&
                                  departmentdata.map((item: Department) => (
                                    <SelectItem
                                      key={item._id}
                                      value={item._id || "0"}
                                    >
                                      <div className="flex cursor-pointer items-center gap-2">
                                        <p className="capitalize">
                                          {item.name}
                                        </p>
                                      </div>
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="shad-error" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="position"
                      label="Position"
                      placeholder="Frontend Developer"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.DATE_PICKER}
                      control={form.control}
                      name="hired_date"
                      label="Hired date"
                      iconNode={FaRegCalendarAlt}
                    />
                  </div>

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    iconNode={IoLocationOutline}
                    placeholder="123, Street, City"
                  />
                  <div className="flex flex-col gap-4 md:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={form.control}
                      name="phone"
                      label="Phone Number"
                      placeholder="(+84) 123-4567"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="status"
                      label="Status"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <RadioGroup
                            className="flex h-11 gap-6 xl:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {statuses.map((option, i) => (
                              <div
                                key={option.value + i}
                                className="radio-group"
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={option.value}
                                />
                                <Label
                                  htmlFor={option.value}
                                  className="cursor-pointer"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <SubmitButton
                    isLoading={isLoading}
                    className={`shad-primary-btn w-36`}
                  >
                    {employee ? "Update Employee" : "Submit Employee"}
                  </SubmitButton>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
