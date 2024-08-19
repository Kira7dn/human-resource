"use server";
import { Candidate as CandidateType } from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Candidate from "../database/models/candidate.model";

export async function createBatchCandidate(data: CandidateType[]) {
  try {
    await connectToDatabase();
    await Candidate.deleteMany({});
    const newCandidates = await Candidate.create(data);
    return JSON.parse(JSON.stringify(newCandidates));
  } catch (error) {
    handleError(error);
  }
}

export async function createCandidate(candidate: CandidateType) {
  try {
    await connectToDatabase();
    const newCandidate = await Candidate.create(candidate);
    return JSON.parse(JSON.stringify(newCandidate));
  } catch (error) {
    handleError(error);
  }
}

export async function getCandidateById(candidateId: string) {
  try {
    await connectToDatabase();
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new Error("Candidate not found");
    return JSON.parse(JSON.stringify(candidate));
  } catch (error) {
    handleError(error);
  }
}

export async function updateCandidate(
  candidateId: string,
  candidate: CandidateType,
) {
  try {
    await connectToDatabase();
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      candidate,
      {
        new: true,
      },
    );
    if (!updatedCandidate) throw new Error("Candidate update failed");
    return JSON.parse(JSON.stringify(updatedCandidate));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteCandidate(candidateId: string) {
  try {
    await connectToDatabase();
    const candidateDelete = await Candidate.findByIdAndDelete(candidateId);
    if (!candidateDelete) {
      throw new Error("Candidate deleted failed");
    }
    revalidatePath("/");
    return candidateDelete ? JSON.parse(JSON.stringify(candidateDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}
