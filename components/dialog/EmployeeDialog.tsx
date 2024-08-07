"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";

import { Form, FormControl } from "@/components/ui//form";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import SubmitButton from "../submit-btn";
import { Employee, EmployeeValidation } from "@/lib/validations";
import { department, gender, level, status } from "@/constants";
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
import { ScrollArea } from "@/components/ui//scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";

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
      <DialogContent className="max-w-lg">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {employee ? "Edit" : "Create"} Employee profile
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] rounded-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-6"
            >
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="image"
                label="Image"
                renderSkeleton={(field) => (
                  <div className="flex items-center gap-4">
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
                                  <Avatar className="">
                                    <AvatarImage
                                      src={
                                        field.value ||
                                        "https://github.com/shadcn.png"
                                      }
                                    />
                                    {/* <AvatarFallback>{fallback_name}</AvatarFallback> */}
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
              <div
                className={`flex flex-col gap-6  ${!employee && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Name"
                  iconSrc="assets/icons/user.svg"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="gender"
                  label="Gender"
                  placeholder="Select"
                >
                  {gender.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p className="capitalize">{item}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <div
                className={`flex flex-col gap-6  ${!employee && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="birthDate"
                  label="Birth date"
                />
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="(+84) 123-4567"
                />
              </div>
              <div
                className={`flex flex-col gap-6  ${!employee && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="position"
                  label="Position"
                  placeholder="Frontend Developer"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="123, Street, City"
                />
              </div>
              <div
                className={`flex flex-col gap-6  ${!employee && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="level"
                  label="Level"
                  placeholder="Select"
                >
                  {level.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p className="capitalize">{item}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
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
              <div
                className={`flex flex-col gap-6  ${!employee && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="hired_date"
                  label="Hired date"
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
                        {status.map((option, i) => (
                          <div key={option + i} className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </div>

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
