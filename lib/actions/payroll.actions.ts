"use server";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Payroll as PayrollType } from "@/types";
import Payroll from "../database/models/payroll.model";

export async function createBatchPayroll(data: PayrollType[]) {
  try {
    await connectToDatabase();
    await Payroll.deleteMany({});
    const newPayrolls = await Payroll.create(data);
    return JSON.parse(JSON.stringify(newPayrolls));
  } catch (error) {
    handleError(error);
  }
}

export async function createPayroll(payroll: PayrollType) {
  try {
    await connectToDatabase();
    const newPayroll = await Payroll.create(Payroll);
    return JSON.parse(JSON.stringify(newPayroll));
  } catch (error) {
    handleError(error);
  }
}

export async function getPayrollById(payrollId: string) {
  try {
    await connectToDatabase();
    const payroll = await Payroll.findById(payrollId);
    if (!Payroll) throw new Error("Payroll not found");
    return JSON.parse(JSON.stringify(Payroll));
  } catch (error) {
    handleError(error);
  }
}

export async function updatePayroll(payrollId: string, payroll: PayrollType) {
  try {
    await connectToDatabase();
    const updatedPayroll = await Payroll.findByIdAndUpdate(payrollId, payroll, {
      new: true,
    });
    if (!updatedPayroll) throw new Error("Payroll update failed");
    return JSON.parse(JSON.stringify(updatedPayroll));
  } catch (error) {
    handleError(error);
  }
}

export async function deletePayroll(payrollId: string) {
  try {
    await connectToDatabase();
    const payrollDelete = await Payroll.findByIdAndDelete(payrollId);
    if (!payrollDelete) {
      throw new Error("Payroll deleted failed");
    }
    revalidatePath("/");
    return payrollDelete ? JSON.parse(JSON.stringify(payrollDelete)) : null;
  } catch (error) {
    handleError(error);
  }
}
