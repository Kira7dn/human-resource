import { Employee } from "@/lib/validations";

export type Payroll = {
  _id?: string;
  employee?: string | Employee;
  period?: Date;
  work_day?: number;
  overtime?: number;
  paid_leave?: number;
  unpaid_leave?: number;
};

export type DepartmentType = {
  _id: string;
  name: string;
  description: string;
};

export type Attendance = {
  _id: string;
  employee: string | Employee;
  date: Date;
  overtime: number;
  attendance_status: string;
  id_scan_time: Date[];
};
