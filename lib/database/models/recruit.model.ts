import { Schema, model, models } from "mongoose";

const RecruitSchema = new Schema({
  expried_date: { type: String, required: true },
  quantity: { type: Number, required: true },
  position: { type: String, required: true },
  level: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
});

const Recruit = models.Recruit || model("Recruit", RecruitSchema);

export default Recruit;
