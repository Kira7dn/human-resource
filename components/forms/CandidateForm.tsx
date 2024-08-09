"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";

import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import SubmitButton from "../submit-btn";
import { CandidateValidation } from "@/lib/validations";
import { gender, level } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const CandidateForm = ({
  type = "create",
  setOpen,
}: {
  type: "create" | "update";
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof CandidateValidation>>({
    resolver: zodResolver(CandidateValidation),
    defaultValues: {
      name: "",
      position: "",
      level: "",
      birthDate: new Date("1/1/1990"),
    },
  });
  const onSubmit = async (values: z.infer<typeof CandidateValidation>) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "update":
      buttonLabel = "Update Candidate";
      break;
    default:
      buttonLabel = "Submit Candidate";
  }

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="profile_image"
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
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-gray-500 hover:border-primary">
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {field.value ? (
                              <Image
                                src={field.value}
                                alt="profile_icon"
                                width={12}
                                height={12}
                                priority
                                className="h-auto w-auto cursor-pointer object-contain "
                              />
                            ) : (
                              <Image
                                src="/assets/icons/profile.svg"
                                alt="profile_icon"
                                width={12}
                                height={12}
                                className="h-auto w-auto cursor-pointer object-contain"
                              />
                            )}
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
          className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
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
          className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
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
          className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
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
          className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}
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
        </div>

        <SubmitButton
          isLoading={isLoading}
          className={`shad-primary-btn w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
