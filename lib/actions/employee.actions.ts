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
    revalidatePath("/employee");
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
    if (!employee) throw new Error("Employee not found");
    return JSON.parse(JSON.stringify(employee));
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
    revalidatePath("/employee");
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
    revalidatePath("/employee");
    return employeeDelete ? JSON.parse(JSON.stringify(employeeDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function aggregateEmployeeByGender() {
  try {
    await connectToDatabase();
    const result = await Employee.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // 1 for ascending order, -1 for descending order
        },
      },
    ]);
    return result;
  } catch (error) {
    handleError(error);
  }
}

export async function aggregateEmployeeByDepartment() {
  try {
    await connectToDatabase();
    const result = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $group: {
          _id: "$department.name",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    handleError(error);
  }
}

interface AggregatedData {
  unit: string;
  [level: string]: number | string;
}

export async function aggregateEmployeeByDepartmentByLevel(): Promise<
  AggregatedData[]
> {
  try {
    await connectToDatabase();
    const data = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $group: {
          _id: {
            unit: "$department.name",
            level: "$level",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.unit": 1,
          "_id.level": 1,
        },
      },
    ]);

    const resultMap = new Map<string, AggregatedData>();

    data.forEach((item) => {
      const { unit, level } = item._id;
      if (!resultMap.has(unit)) {
        resultMap.set(unit, { unit });
      }
      const deptObj = resultMap.get(unit)!;
      deptObj[level] = item.count;
    });

    return Array.from(resultMap.values());
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error after handling it
  }
}
