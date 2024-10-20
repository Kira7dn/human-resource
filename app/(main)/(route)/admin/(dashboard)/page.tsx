import React from "react";
import { EmployeeByBusinessUnit } from "./_components/EmployeeByBusinessUnit";
import { PositionByGrade } from "./_components/PositionByGrade";
import { HireByBusinessUnit } from "./_components/HireByBusinessUnit";
import { LeaveStatus } from "./_components/LeaveStatus";
import { EmployeeGenderTotal } from "./_components/EmployeeGenderTotal";
import ManpowerPlan from "./_components/ManpowerPlan";
import { CandidateDesignate } from "./_components/CandidateDesignate";
import {
  aggregateEmployeeByDepartment,
  aggregateEmployeeByDepartmentByLevel,
  aggregateEmployeeByGender,
} from "@/lib/actions/employee.actions";
import { aggregateRecruitByDepartment } from "@/lib/actions/recruit.actions";
import { aggregateCandidateByLevel } from "@/lib/actions/candidate.actions";

async function DashBoard() {
  const employeeByGenders = await aggregateEmployeeByGender();
  const employeeByDepartments = await aggregateEmployeeByDepartment();
  const employeeByDepartmentsByLevel =
    await aggregateEmployeeByDepartmentByLevel();
  const recruitByDepartments = await aggregateRecruitByDepartment();
  const candidateByLevel = await aggregateCandidateByLevel();

  return (
    <div className="flex w-full flex-col gap-4 py-2">
      <div>
        <h1 className="block text-heading4-bold text-secondary">DashBoard</h1>
        <p className="text-body-medium text-gray-600">
          Overview of notes regarding HR Management
        </p>
      </div>
      <div className="grid h-[75vh] grid-cols-3 items-center gap-2 lg:grid-cols-10">
        <div className="col-span-3 row-span-12 flex h-full flex-col gap-2">
          <div className="h-1/2">
            {employeeByDepartments && (
              <EmployeeByBusinessUnit data={employeeByDepartments} />
            )}
          </div>
          <div className="h-1/2">
            {employeeByDepartmentsByLevel && (
              <PositionByGrade data={employeeByDepartmentsByLevel} />
            )}
          </div>
          {/* <div className="row-span-1">
            <LeaveStatus />
          </div> */}
        </div>
        <div className="col-span-4 row-span-12 flex h-full flex-col gap-2">
          <div className="h-1/2">
            {employeeByGenders && (
              <EmployeeGenderTotal data={employeeByGenders} />
            )}
          </div>
          <div className="h-1/2">
            <ManpowerPlan />
          </div>
        </div>
        <div className="col-span-3 row-span-12 flex h-full flex-col gap-2">
          <div className="h-1/2">
            {recruitByDepartments && (
              <HireByBusinessUnit data={recruitByDepartments} />
            )}
          </div>
          <div className="h-1/2">
            {candidateByLevel && <CandidateDesignate data={candidateByLevel} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
