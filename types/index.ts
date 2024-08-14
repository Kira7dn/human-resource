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

export type Recruit = {
  id: string;
  expried_date: string;
  quantity: number;
  position: string;
  level: string;
  department: string;
  salary: string;
  description: string;
};
