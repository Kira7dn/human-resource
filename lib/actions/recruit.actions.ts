"use server";
import { Recruit as RecruitType } from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Recruit from "../database/models/recruit.model";
import { revalidatePath } from "next/cache";

export async function createBatchRecruit(data: RecruitType[]) {
  try {
    await connectToDatabase();
    await Recruit.deleteMany({});
    const newRecruits = await Recruit.create(data);
    return JSON.parse(JSON.stringify(newRecruits));
  } catch (error) {
    handleError(error);
  }
}

export async function createRecruit(recruit: RecruitType) {
  try {
    await connectToDatabase();
    const newRecruit = await Recruit.create(recruit);
    return JSON.parse(JSON.stringify(newRecruit));
  } catch (error) {
    handleError(error);
  }
}

export async function getRecruitById(recruitId: string) {
  try {
    await connectToDatabase();
    const recruit = await Recruit.findById(recruitId);
    if (!recruit) throw new Error("Recruit not found");
    return JSON.parse(JSON.stringify(recruit));
  } catch (error) {
    handleError(error);
  }
}

export async function updateRecruit(recruitId: string, recruit: RecruitType) {
  try {
    await connectToDatabase();
    const updatedRecruit = await Recruit.findByIdAndUpdate(recruitId, recruit, {
      new: true,
    });
    if (!updatedRecruit) throw new Error("Recruit update failed");
    return JSON.parse(JSON.stringify(updatedRecruit));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteRecruit(recruitId: string) {
  try {
    await connectToDatabase();
    const recruitDelete = await Recruit.findByIdAndDelete(recruitId);
    if (!recruitDelete) {
      throw new Error("Recruit deleted failed");
    }
    revalidatePath("/");
    return recruitDelete ? JSON.parse(JSON.stringify(recruitDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}
