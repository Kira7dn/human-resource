"use server";
import {
  Candidate as CandidateType,
  CandidateValidation,
} from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Candidate from "../database/models/candidate.model";
import { z } from "zod";

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
    revalidatePath("/candidate");
    return JSON.parse(JSON.stringify(newCandidate));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllCandidates(filter = {}) {
  try {
    await connectToDatabase();
    const candidates = await Candidate.find(filter).populate("recruit");
    return z
      .array(CandidateValidation)
      .parse(JSON.parse(JSON.stringify(candidates)));
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
    revalidatePath("/candidate");
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
    revalidatePath("/candidate");
    return candidateDelete ? JSON.parse(JSON.stringify(candidateDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function aggregateCandidateByLevel() {
  // get level from model Recruit

  try {
    await connectToDatabase();
    const candidates = await Candidate.aggregate([
      {
        $lookup: {
          from: "recruits",
          localField: "recruit",
          foreignField: "_id",
          as: "recruit",
        },
      },
      {
        $unwind: "$recruit",
      },
      {
        $group: {
          _id: "$recruit.level",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return JSON.parse(JSON.stringify(candidates));
  } catch (error) {
    handleError(error);
  }
}
