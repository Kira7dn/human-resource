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
import { Candidate, CandidateValidation, Recruit } from "@/lib/validations";
import { genders, levels } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui//tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui//scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";

export const CandidateDialog = ({
  candidate,
  recruitment,
  children,
}: {
  candidate?: Candidate;
  recruitment?: Recruit;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof CandidateValidation>>({
    resolver: zodResolver(CandidateValidation),
    defaultValues: candidate
      ? candidate
      : {
          image: "https://github.com/shadcn.png",
          email: "",
          name: "",
          birthDate: new Date("1990/1/1"),
          phone: "",
          gender: "Male",
          address: "",
          position: recruitment ? recruitment.position : "",
          level: recruitment ? recruitment.level : "",
        },
  });
  const onSubmit = async (values: z.infer<typeof CandidateValidation>) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  let buttonLabel = candidate ? "Update Candidate" : "Submit Candidate";

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
            {candidate ? "Edit" : "Create"} Candidate profile
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
                label=""
                renderSkeleton={(field) => (
                  <div className="flex items-center gap-4">
                    <FormControl className="flex-1 text-base-semibold text-secondary">
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          name="file"
                          id="file"
                          className="absolute -z-10 h-0 w-0 opacity-0"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                        <label htmlFor="file">
                          <div className="cursor-pointer rounded-full border border-transparent hover:border-primary">
                            <TooltipProvider delayDuration={200}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={
                                        field.value ||
                                        "https://github.com/shadcn.png"
                                      }
                                    />
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
              <div className={`flex flex-col gap-6 md:flex-row`}>
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
              </div>
              <div className={`flex flex-col gap-6 md:flex-row`}>
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
                  name="level"
                  label="Level"
                  placeholder="Select"
                >
                  {levels.map((item, i) => (
                    <SelectItem key={i} value={item.value}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <p className="capitalize">{item.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="123, Street, City"
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
