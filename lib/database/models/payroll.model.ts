import mongoose, { Schema, model, models } from "mongoose";
import Employee from "./employee.model";

const PayrollSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee,
    required: true,
  },
  period: { type: Date, required: true },
  gross_salary: { type: Number, required: true },
  position_allowance: { type: Number, required: true },
  travel_allowance: { type: Number, required: true },
  work_day: { type: Number, default: 0, required: true },
  overtime: { type: Number, default: 0, required: true },
  paid_leave: { type: Number, default: 0, required: true },
  unpaid_leave: { type: Number, default: 0, required: true },
});

const Payroll = models.Payroll || model("Payroll", PayrollSchema);
export default Payroll;
