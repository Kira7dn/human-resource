import mongoose, { Schema, model, models } from "mongoose";
import { levels } from "@/constants";
import Department from "./department.model";

const RecruitSchema = new Schema({
  expried_date: { type: String, required: true },
  quantity: { type: Number, required: true },
  position: { type: String, required: true },
  level: { type: String, enum: levels.map((level) => level.value) },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Department,
    required: true,
  },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
});

const Recruit = models.Recruit || model("Recruit", RecruitSchema);

export default Recruit;
