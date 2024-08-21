import mongoose, { Schema, model, models } from "mongoose";
import { genders, statuses } from "@/constants";
import Recruit from "./recruit.model";

const CandidateSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: genders.map((gender) => gender.value) },
  address: { type: String, required: true },
  status: { type: String, enum: statuses.map((status) => status.value) },
  recruit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Recruit,
    required: true,
  },
});

const Candidate = models.Candidate || model("Candidate", CandidateSchema);

export default Candidate;
