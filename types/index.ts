import { Employee } from "@/lib/validations";

export type Payroll = {
  id: string;
  image: string;
  name: string;
  email: string;
  position: string;
  level: string;
  department: string;
  month: number;
  hired_date: string;
  gross_salary: number;
  overtime: number;
  paid_leave: number;
  unpaid_leave: number;
  position_allowance: number;
  travel_allowance: number;
};

export type DepartmentType = {
  _id: string;
  name: string;
  description: string;
};
