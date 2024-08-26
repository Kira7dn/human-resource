"use server";
import {
  Employee as EmployeeType,
  EmployeeValidation,
} from "@/lib/validations";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Employee from "../database/models/employee.model";
import { z } from "zod";

export async function createBatchEmployee(data: EmployeeType[]) {
  try {
    await connectToDatabase();
    await Employee.deleteMany({});
    const newEmployees = await Employee.create(data);
    return JSON.parse(JSON.stringify(newEmployees));
  } catch (error) {
    handleError(error);
  }
}

export async function createEmployee(employee: EmployeeType) {
  try {
    await connectToDatabase();
    const newEmployee = await Employee.create(employee);
    return JSON.parse(JSON.stringify(newEmployee));
  } catch (error) {
    handleError(error);
  }
}
export async function getAllEmployees() {
  try {
    await connectToDatabase();
    const employees = await Employee.find().populate("department");
    return z
      .array(EmployeeValidation)
      .parse(JSON.parse(JSON.stringify(employees)));
  } catch (error) {
    handleError(error);
  }
}

export async function getEmployeeById(employeeId: string) {
  try {
    await connectToDatabase();
    const employee = await Employee.findById(employeeId);
    if (!Employee) throw new Error("Employee not found");
    return JSON.parse(JSON.stringify(Employee));
  } catch (error) {
    handleError(error);
  }
}

export async function updateEmployee(
  employeeId: string,
  employee: EmployeeType,
) {
  try {
    await connectToDatabase();
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      employee,
      {
        new: true,
      },
    );
    if (!updatedEmployee) throw new Error("Employee update failed");
    return JSON.parse(JSON.stringify(updatedEmployee));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    await connectToDatabase();
    const employeeDelete = await Employee.findByIdAndDelete(employeeId);
    if (!employeeDelete) {
      throw new Error("Employee deleted failed");
    }
    revalidatePath("/");
    return employeeDelete ? JSON.parse(JSON.stringify(employeeDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}
