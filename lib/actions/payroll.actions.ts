"use server";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Payroll as PayrollType } from "@/types";
import Payroll from "../database/models/payroll.model";
import Employee from "../database/models/employee.model";

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

export async function updatePayrollByEmployee(data: PayrollType) {
  try {
    await connectToDatabase();
    const employee = await Employee.findById(data.employee);
    const payroll_data = {
      ...data,
      gross_salary: employee.gross_salary,
      position_allowance: employee.position_allowance,
      travel_allowance: employee.travel_allowance,
    };
    const currentPayroll = await Payroll.findOne({
      employee: data.employee,
      period: data.period,
    });
    if (!currentPayroll) {
      const returnPayroll = await Payroll.create(payroll_data);
      if (!returnPayroll) throw new Error("Payroll create failed");
      return returnPayroll;
    } else {
      const payroll_update_data = {
        ...payroll_data,
        work_day: currentPayroll.work_day + payroll_data.work_day || 0,
        overtime: currentPayroll.overtime + payroll_data.overtime || 0,
        paid_leave: currentPayroll.paid_leave + payroll_data.paid_leave || 0,
        unpaid_leave:
          currentPayroll.unpaid_leave + payroll_data.unpaid_leave || 0,
      };
      const returnPayroll = await Payroll.findByIdAndUpdate(
        currentPayroll._id,
        payroll_update_data,
      );
      if (!returnPayroll) throw new Error("Payroll create failed");
      return returnPayroll;
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getPayrollById(payrollId: string) {
  try {
    await connectToDatabase();
    const payroll = await Payroll.findById(payrollId);
    if (!payroll) throw new Error("Payroll not found");
    return JSON.parse(JSON.stringify(payroll));
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
