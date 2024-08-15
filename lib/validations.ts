import { department, level, status } from "@/constants";
import * as z from "zod";

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
  level: z.enum([level[0], ...level], {
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
  level: z.enum([level[0], ...level], {
    message: "Select level",
  }),
  department: z.enum([department[0], ...department], {
    message: "Select department",
  }),
  hired_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  status: z.enum([status[0], ...status]).optional(),
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
  level: z.enum([level[0], ...level], {
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
  level: z.enum([level[0], ...level], {
    message: "Select level",
  }),
  department: z.enum([department[0], ...department], {
    message: "Select department",
  }),
  salary: z.string(),
  description: z.string(),
});

export type Employee = z.infer<typeof EmployeeValidation>;
export type Candidate = z.infer<typeof CandidateValidation>;
export type Recruit = z.infer<typeof RecruitValidation>;
