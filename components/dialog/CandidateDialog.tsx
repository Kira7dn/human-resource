"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../custom-form-field";
import SubmitButton from "../submit-btn";
import { Candidate, CandidateValidation, Recruit } from "@/lib/validations";
import { genders, levels, statuses } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MultiFilesUpload from "@/components/upload/multifile-dropzone2";
import SingleImageUpload from "../upload/single-image";
import {
  createCandidate,
  updateCandidate,
} from "@/lib/actions/candidate.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const CandidateDialog = ({
  candidate,
  recruitment,
  children,
}: {
  candidate?: Candidate;
  recruitment?: Recruit;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CandidateValidation>>({
    resolver: zodResolver(CandidateValidation),
    defaultValues: candidate
      ? candidate
      : {
        email: "",
        name: "",
        birthDate: new Date("1990/1/1"),
        phone: "",
        gender: "male",
        address: "",
        status: "active",
        recruit: recruitment ? recruitment._id : "",
      },
  });
  const onSubmit = async (values: z.infer<typeof CandidateValidation>) => {
    setIsLoading(true);
    if (candidate?._id) {
      await updateCandidate(candidate._id, values);
    } else {
      await createCandidate(values);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {candidate ? "Edit" : "Create"} Candidate profile
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col space-y-6"
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
                  iconSrc="assets/icons/user.svg"
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
                          <div key={option.value + i} className="radio-group">
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
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-1 flex-col justify-between ">
                  <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="(+84) 123-4567"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="123, Street, City"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="123, Street, City"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="recruit.position"
                    label="Position"
                    disabled
                  />

                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="recruit.level"
                    label="Level"
                    placeholder="Select"
                    disabled
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
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="files"
                  label="Upload your CV"
                  renderSkeleton={(field) => (
                    <div className="flex w-full items-center justify-center gap-4">
                      <FormControl className="w-fullflex flex-1 flex-col items-center text-base-semibold text-secondary">
                        <MultiFilesUpload
                          onChange={(values) => {
                            field.onChange(values);
                          }}
                          files={field.value}
                        />
                      </FormControl>
                    </div>
                  )}
                />
              </div>
            </div>

            <SubmitButton
              isLoading={isLoading}
              className={`shad-primary-btn w-full`}
            >
              {candidate ? "Update Candidate" : "Submit Candidate"}
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
