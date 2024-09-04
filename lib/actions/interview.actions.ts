"use server";
import {
  Interview as InterviewType,
  RecruitValidation,
} from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import Interview from "../database/models/interview.model";

export async function createBatchInterview(data: InterviewType[]) {
  try {
    await connectToDatabase();
    await Interview.deleteMany({});
    const newInterviews = await Interview.create(data);
    return JSON.parse(JSON.stringify(newInterviews));
  } catch (error) {
    handleError(error);
  }
}

export async function createInterview(data: InterviewType) {
  try {
    await connectToDatabase();
    const newData = await Interview.create(data);
    return JSON.parse(JSON.stringify(newData));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllInterviews() {
  try {
    await connectToDatabase();
    const recruits = await Interview.find().populate({
      path: "candidate",
      populate: { path: "recruit", populate: "department" },
    });
    return z
      .array(RecruitValidation)
      .parse(JSON.parse(JSON.stringify(recruits)));
  } catch (error) {
    handleError(error);
  }
}
export async function getInterviewById(_id: string) {
  try {
    await connectToDatabase();
    const data = await Interview.findById(_id);
    if (!data) throw new Error("Data not found");
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    handleError(error);
  }
}

export async function updateRecruit(_id: string, data: InterviewType) {
  try {
    await connectToDatabase();
    const newData = await Interview.findByIdAndUpdate(_id, data, {
      new: true,
    });
    if (!newData) throw new Error("Data update failed");
    return JSON.parse(JSON.stringify(newData));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteRecruit(_id: string) {
  try {
    await connectToDatabase();
    const deletedData = await Interview.findByIdAndDelete(_id);
    if (!deletedData) {
      throw new Error("Data deleted failed");
    }
    revalidatePath("/");
    return deletedData ? JSON.parse(JSON.stringify(deletedData)) : null;
  } catch (error) {
    handleError(error);
  }
}
