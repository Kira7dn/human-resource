import mongoose, { Schema, model, models } from "mongoose";
import Employee from "./employee.model";

const AttendanceSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee,
    required: true,
  },
  date: { type: Date, required: true },
  attendance_status: { type: String, default: "work", required: true },
  overtime: { type: Number, default: 0 },
  id_scan_time: [{ type: Date }],
});

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);
export default Attendance;
