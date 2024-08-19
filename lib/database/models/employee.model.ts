import mongoose, { Schema, model, models } from "mongoose";
import { genders, levels, statuses } from "@/constants";

const EmployeeSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: genders.map((gender) => gender.value) },
  address: { type: String, required: true },
  position: { type: String, required: true },
  level: { type: String, enum: levels.map((level) => level.value) },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  hired_date: { type: String, required: true },
  end_date: { type: String },
  status: { type: String, enum: statuses.map((status) => status.value) },
  gross_salary: { type: Number, required: true },
  position_allowance: { type: Number, required: true },
  travel_allowance: { type: Number, required: true },
});

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;
