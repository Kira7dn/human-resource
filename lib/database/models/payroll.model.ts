import { Schema, model, models } from "mongoose";
import Employee from "./employee.model";

const PayrollSchema = new Schema({
  employee: { type: Employee, required: true },
  period_from: { type: String, required: true },
  period_to: { type: String, required: true },
  gross_salary: { type: Number, required: true },
  position_allowance: { type: Number, required: true },
  travel_allowance: { type: Number, required: true },
  overtime: { type: Number, default: 0, required: true },
  paid_leave: { type: Number, default: 0, required: true },
  unpaid_leave: { type: Number, default: 0, required: true },
});

const Payroll = models.Payroll || model("Payroll", PayrollSchema);
export default Payroll;
