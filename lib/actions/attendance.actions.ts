"use server";
import { connectToDatabase } from "@/lib/database";
import { getDateMidnight, getMonthFirst, handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Attendance from "../database/models/attendance.model";
import { updatePayrollByEmployee } from "./payroll.actions";
import { AttendanceType } from "../validations";

export async function createBatchAttendance(data: AttendanceType[]) {
  try {
    await connectToDatabase();
    await Attendance.deleteMany({});
    const newAttendances = await Attendance.create(data);
    return JSON.parse(JSON.stringify(newAttendances));
  } catch (error) {
    handleError(error);
  }
}

export async function createAttendance(data: AttendanceType) {
  try {
    await connectToDatabase();
    const new_data = await Attendance.create(data);
    return JSON.parse(JSON.stringify(new_data));
  } catch (error) {
    handleError(error);
  }
}
export async function getAllAttendance(filter = {}) {
  try {
    await connectToDatabase();
    const data = await Attendance.find(filter).populate("employee");
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    handleError(error);
  }
}

export async function getAttendanceListByMonth(
  date: Date,
  // employee_id: string,
) {
  const filter = {
    // employee: employee_id,
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), 1),
      $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
    },
  };
  try {
    await connectToDatabase();
    const attendanceRecords = await Attendance.find(filter)
      .populate("employee")
      .sort({ date: 1 });
    const groupedByEmployee = attendanceRecords.reduce((acc, record) => {
      const employeeId = record.employee._id.toString();
      if (!acc[employeeId]) {
        acc[employeeId] = { employee: record.employee };
      }
      const dateKey = record.date.toISOString();
      acc[employeeId][dateKey] = record;
      return acc;
    }, []);
    const result = Object.values(groupedByEmployee);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getAttendanceById(_id: string) {
  try {
    await connectToDatabase();
    const data = await Attendance.findById(_id).populate("employee");
    if (!data) throw new Error("Attendance not found");
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    handleError(error);
  }
}

export async function updateIDScan(employee_id: string, timestamp: Date) {
  const date = getDateMidnight(timestamp);
  try {
    await connectToDatabase();
    let return_data;
    const attendance = await Attendance.findOne({
      employee: employee_id,
      date: date,
    });
    if (!attendance) {
      return_data = await Attendance.create({
        employee: employee_id,
        date: date,
        id_scan_time: [timestamp],
      });
    } else {
      return_data = await Attendance.findByIdAndUpdate(attendance._id, {
        ...attendance,
        id_scan_time: [...attendance.id_scan_time, timestamp],
      });
    }
    if (!return_data) throw new Error("Attendance update failed");
    if (return_data.id_scan_time.lengh >= 2) {
      const payroll_data = {
        employee: employee_id,
        period: getMonthFirst(date),
        work_day: 1,
      };
      const updated_payroll = await updatePayrollByEmployee(payroll_data);
      if (!updated_payroll) throw new Error("Payroll update failed");
    }
    return JSON.parse(JSON.stringify(return_data));
  } catch (error) {
    handleError(error);
  }
}

export async function updateAttendanceStatus(data: AttendanceType) {
  try {
    await connectToDatabase();
    const attendance = await Attendance.findOneAndUpdate(
      {
        employee: data.employee,
        date: getDateMidnight(data.date),
      },
      data,
      { new: true },
    );
    const payroll_data = {
      employee: data.employee,
      period: getMonthFirst(data.date),
      overtime: data.overtime,
      work_day: data.attendance_status === "work_day" ? 1 : 0,
      paid_leave: data.attendance_status === "paid_leave" ? 1 : 0,
      unpaid_leave: data.attendance_status === "unpaid_leave" ? 1 : 0,
    };
    const updated_payroll = await updatePayrollByEmployee(payroll_data);
    if (!updated_payroll) throw new Error("Payroll update failed");
    if (!attendance) throw new Error("Attendance update failed");
    return JSON.parse(JSON.stringify(attendance));
  } catch (error) {
    handleError(error);
  }
}

export async function updateAttendance(data: AttendanceType, filter = {}) {
  try {
    await connectToDatabase();
    const updated_data = await Attendance.findOneAndUpdate(filter, data, {
      new: true,
    });
    if (!updated_data) throw new Error("Attendance update failed");
    return JSON.parse(JSON.stringify(updated_data));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteAttendance(_id: string) {
  try {
    await connectToDatabase();
    const AttendanceDelete = await Attendance.findByIdAndDelete(_id);
    if (!AttendanceDelete) {
      throw new Error("Attendance deleted failed");
    }
    revalidatePath("/");
    return AttendanceDelete
      ? JSON.parse(JSON.stringify(AttendanceDelete))
      : null;
  } catch (error) {
    handleError(error);
  }
}
