import { genders, levels, statuses } from "@/constants";
import * as z from "zod";

const level = levels.map((item) => item.value) as [string, ...string[]];
const status = statuses.map((item) => item.value) as [string, ...string[]];
const gender = genders.map((item) => item.value) as [string, ...string[]];
export const InterviewValidation = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(3, {
      message: "Minimum 3 characters.",
    })
    .max(50, {
      message: "Maximum 30 caracters.",
    }),
  position: z
    .string()
    .min(3, {
      message: "Minimum 3 characters.",
    })
    .max(300, {
      message: "Maximum 300 caracters.",
    }),
  level: z.enum(level, {
    message: "Select level",
  }),
  appointment_date: z.coerce.date(),
});
export const DepartmentValidation = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(3, {
      message: "Minimum 3 characters.",
    })
    .max(30, {
      message: "Maximum 30 caracters.",
    }),
  description: z.string().optional(),
});

export const FileVadidate = z.object({
  filename: z.string().min(1),
  url: z.string().min(1),
});

export const EmployeeValidation = z.object({
  _id: z.string().optional(),
  employee_id: z.string(),
  image: z.string().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  birthDate: z.coerce.date(),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  gender: z.enum(gender),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  position: z
    .string()
    .min(3, {
      message: "Minimum 3 characters.",
    })
    .max(300, {
      message: "Maximum 300 caracters.",
    }),
  level: z.enum(level, {
    message: "Select level",
  }),
  department: z.union([z.string(), DepartmentValidation]),
  hired_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  status: z.enum(status),
});

export const RecruitValidation = z.object({
  _id: z.string().optional(),
  expried_date: z.coerce.date(),
  quantity: z.number(),
  position: z
    .string()
    .min(3, {
      message: "Minimum 3 characters.",
    })
    .max(300, {
      message: "Maximum 300 caracters.",
    }),
  level: z.enum(level, {
    message: "Select level",
  }),
  department: z.union([z.string(), DepartmentValidation]),
  salary: z.string(),
  description: z.string(),
  requirements: z.string(),
});

export const CandidateValidation = z.object({
  _id: z.string().optional(),
  image: z.string().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  birthDate: z.coerce.date(),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  gender: z.enum(gender),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  status: z.enum(status),
  recruit: z.union([z.string(), RecruitValidation]),
  files: z.array(FileVadidate).optional(),
});

export type Employee = z.infer<typeof EmployeeValidation>;
export type Candidate = z.infer<typeof CandidateValidation>;
export type Recruit = z.infer<typeof RecruitValidation>;
export type Department = z.infer<typeof DepartmentValidation>;
export type File = z.infer<typeof FileVadidate>;
