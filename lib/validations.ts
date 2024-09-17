import {
  attendance_status,
  candidateStatuses,
  genders,
  levels,
  statuses,
} from "@/constants";
import * as z from "zod";

const level = levels.map((item) => item.value) as [string, ...string[]];
const status = statuses.map((item) => item.value) as [string, ...string[]];
const candidate_statuses = candidateStatuses.map((item) => item.value) as [
  string,
  ...string[],
];
const gender = genders.map((item) => item.value) as [string, ...string[]];
const attendance_statuses = attendance_status.map((item) => item) as [
  string,
  ...string[],
];

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
  position: z.string(),
  level: z.enum(level, {
    message: "Select level",
  }),
  salary: z.string(),
  description: z.string(),
  requirements: z.string(),
  department: z.union([z.string(), DepartmentValidation]),
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
  recruit: z.union([z.string(), RecruitValidation]),
  files: z.array(FileVadidate).optional(),
  status: z.enum(candidate_statuses),
  interview_date: z.coerce.date().optional(),
});

export const AttendanceValidate = z.object({
  _id: z.string().optional(),
  employee: z.union([z.string(), EmployeeValidation]),
  date: z.coerce.date(),
  attendance_status: z.enum(attendance_statuses),
  overtime: z.number(),
  id_scan_time: z.array(z.coerce.date()),
});

export const PayrollValidate = z.object({
  _id: z.string().optional(),
  employee: z.union([z.string(), EmployeeValidation]),
  period: z.coerce.date(),
  gross_salary: z.number().optional(),
  position_allowance: z.number().optional(),
  travel_allowance: z.number().optional(),
  work_day: z.number().optional(),
  overtime: z.number().optional(),
  paid_leave: z.number().optional(),
  unpaid_leave: z.array(z.coerce.date()).optional(),
});

export type Employee = z.infer<typeof EmployeeValidation>;
export type Candidate = z.infer<typeof CandidateValidation>;
export type Recruit = z.infer<typeof RecruitValidation>;
export type Department = z.infer<typeof DepartmentValidation>;
export type File = z.infer<typeof FileVadidate>;
export type AttendanceType = z.infer<typeof AttendanceValidate>;
export type PayrollType = z.infer<typeof PayrollValidate>;
