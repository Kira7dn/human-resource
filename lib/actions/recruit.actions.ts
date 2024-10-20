"use server";
import { Recruit as RecruitType, RecruitValidation } from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import Recruit from "../database/models/recruit.model";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

export async function getAllRecruits() {
  try {
    await connectToDatabase();
    const recruits = await Recruit.find().populate("department");
    return z
      .array(RecruitValidation)
      .parse(JSON.parse(JSON.stringify(recruits)));
  } catch (error) {
    handleError(error);
  }
}
export async function getRecruitById(recruitId: string) {
  try {
    await connectToDatabase();
    const recruit = await Recruit.findById(recruitId).populate("department");
    if (!recruit) throw new Error("Recruit not found");
    return RecruitValidation.parse(JSON.parse(JSON.stringify(recruit)));
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
    revalidatePath("/recruitment");
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

export async function aggregateRecruitByDepartment() {
  try {
    await connectToDatabase();
    const recruits = await Recruit.aggregate([
      {
        $group: {
          _id: "$department",
          request: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $project: {
          _id: 0,
          unit: "$department.name",
          request: 1,
        },
      },
      {
        $sort: { unit: 1 },
      },
    ]);
    return recruits;
  } catch (error) {
    handleError(error);
  }
}
