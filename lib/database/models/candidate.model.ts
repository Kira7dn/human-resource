import mongoose, { Schema, model, models } from "mongoose";
import { candidateStatuses, genders, statuses } from "@/constants";
import Recruit from "./recruit.model";

const CandidateSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: genders.map((gender) => gender.value) },
  address: { type: String, required: true },
  recruit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Recruit,
    required: true,
  },
  files: {
    url: { type: String },
    filename: { type: String },
  },
  status: {
    type: String,
    enum: candidateStatuses.map((status) => status.value),
  },
  interview_date: { type: Date },
});

const Candidate = models.Candidate || model("Candidate", CandidateSchema);

export default Candidate;
