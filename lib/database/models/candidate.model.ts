import { Schema, model, models } from "mongoose";
import Recruit from "./recruit.model";
import { genders, statuses } from "@/constants";

const CandidateSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: genders.map((gender) => gender.value) },
  address: { type: String, required: true },
  status: { type: String, enum: statuses.map((status) => status.value) },
  recruit: { type: Recruit, required: true },
});

const Candidate = models.Candidate || model("Candidate", CandidateSchema);

export default Candidate;
