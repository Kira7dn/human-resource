import React from "react";
import Employee from "./_components/Employee";
import Candidate from "./_components/Candidate";
import InterviewSchedule from "./_components/InterviewSchedule";
import { ManpowerPlan } from "./_components/ManpowerPlan";

type Props = {};

const DashBoard = (props: Props) => {
  return (
    <div className="flex w-full flex-col gap-4 py-2">
      <div>
        <h1 className="block text-heading4-bold text-secondary">DashBoard</h1>
        <p className="text-body-medium text-gray-600">
          Overview of notes regarding HR Management
        </p>
      </div>
      <div className="flex h-[75vh] gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex h-1/4 gap-4">
            <div className="w-1/2">
              <Employee />
            </div>
            <div className="w-1/2">
              <Candidate />
            </div>
          </div>
          <div className="h-3/4">
            <ManpowerPlan />
          </div>
        </div>
        <div className="w-1/3">
          <InterviewSchedule />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
