import { getAttendanceById } from "@/lib/actions/attendance.actions";
import React from "react";
import { AttendanceForm } from "../_component/attendance-form";

async function page({ params }: { params: { id: string } }) {
  const data = await getAttendanceById(params.id);
  if (!data) return <h4>Attendance not found</h4>;
  return <AttendanceForm attendance={data} />;
}

export default page;
