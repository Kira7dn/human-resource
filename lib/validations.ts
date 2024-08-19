import { department, levels, statuses } from "@/constants";
import * as z from "zod";

const level = levels.map((item) => item.value) as [string, ...string[]];
const departments = department as [string, ...string[]];
const status = statuses.map((item) => item.value) as [string, ...string[]];
export const InterviewValidation = z.object({
  id: z.string().optional(),
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

export const EmployeeValidation = z.object({
  id: z.string().optional(),
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
  gender: z.enum(["Male", "Female", "Other"]),
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
  department: z.enum(departments, {
    message: "Select department",
  }),
  hired_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  status: z.enum(status).optional(),
});

export const CandidateValidation = z.object({
  id: z.string().optional(),
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
  gender: z.enum(["Male", "Female", "Other"]),
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
});
export const RecruitValidation = z.object({
  id: z.string().optional(),
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
  department: z.enum(departments, {
    message: "Select department",
  }),
  salary: z.string(),
  description: z.string(),
  requirements: z.string(),
});

export const DepartmentValidation = z.object({
  id: z.string().optional(),
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

export type Employee = z.infer<typeof EmployeeValidation>;
export type Candidate = z.infer<typeof CandidateValidation>;
export type Recruit = z.infer<typeof RecruitValidation>;
export type Department = z.infer<typeof DepartmentValidation>;
