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
import { Department, Employee, EmployeeValidation } from "@/lib/validations";
import { genders, levels, statuses } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui//tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui//radio-group";
import { Label } from "@/components/ui//label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAllDepartments } from "@/lib/actions/department.actions";
import { Spinner } from "../spinner";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { PiIdentificationCard } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";

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
      setDepartmentdata(data);
      setLoadingdata(false);
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
    console.log(values);
    setIsLoading(false);
  };

  let buttonLabel = employee ? "Update Employee" : "Submit Employee";

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
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
                  renderSkeleton={(field) => (
                    <div className="flex items-center justify-center gap-4">
                      <FormControl className="flex-1  text-base-semibold text-secondary">
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            name="file"
                            id="file"
                            className="absolute -z-10 h-0 w-0  opacity-0"
                            onChange={(e) => handleImage(e, field.onChange)}
                          />
                          <label htmlFor="file">
                            <div className="cursor-pointer rounded-full border border-transparent hover:border-primary">
                              <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Avatar className="h-28 w-28">
                                      <AvatarImage
                                        className=""
                                        src={
                                          field.value ||
                                          "https://github.com/shadcn.png"
                                        }
                                      />
                                      <AvatarFallback className="h-full w-full text-heading4-bold font-light">
                                        {form
                                          .getValues()
                                          .name.split(" ")
                                          .map((n) => n[0])}
                                      </AvatarFallback>
                                    </Avatar>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-secondary">
                                    <p>Change Image</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </label>
                        </>
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
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="employee_id"
                  label="Employee ID"
                  iconNode={PiIdentificationCard}
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
                                          <p className="capitalize">
                                            {item.name}
                                          </p>
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
                    {buttonLabel}
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
