"use server";
import { Department as DepartmentType } from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Department from "../database/models/department.model";

export async function createBatchDepartment(data: DepartmentType[]) {
  try {
    await connectToDatabase();
    await Department.deleteMany({});
    const newDepartments = await Department.create(data);
    return JSON.parse(JSON.stringify(newDepartments));
  } catch (error) {
    handleError(error);
  }
}

export async function createDepartment(department: DepartmentType) {
  try {
    await connectToDatabase();
    const newDepartment = await Department.create(department);
    return JSON.parse(JSON.stringify(newDepartment));
  } catch (error) {
    handleError(error);
  }
}

export async function getDepartmentById(departmentId: string) {
  try {
    await connectToDatabase();
    const department = await Department.findById(departmentId);
    if (!department) throw new Error("Department not found");
    return JSON.parse(JSON.stringify(department));
  } catch (error) {
    handleError(error);
  }
}

export async function updateDepartment(
  departmentId: string,
  department: DepartmentType,
) {
  try {
    await connectToDatabase();
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      department,
      {
        new: true,
      },
    );
    if (!updatedDepartment) throw new Error("Department update failed");
    return JSON.parse(JSON.stringify(updatedDepartment));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteDepartment(departmentId: string) {
  try {
    await connectToDatabase();
    const departmentDelete = await Department.findByIdAndDelete(departmentId);
    if (!departmentDelete) {
      throw new Error("Department deleted failed");
    }
    revalidatePath("/");
    return departmentDelete
      ? JSON.parse(JSON.stringify(departmentDelete))
      : null;
  } catch (error) {
    handleError(error);
  }
}
