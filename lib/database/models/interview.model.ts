import mongoose, { Schema, model, models } from "mongoose";
import Candidate from "./candidate.model";

const InterviewSchema = new Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Candidate,
    required: true,
  },
  interview_date: { type: String, required: true },
  status: { type: String },
  note: { type: String },
});

const Interview = models.Interview || model("Interview", InterviewSchema);

export default Interview;
