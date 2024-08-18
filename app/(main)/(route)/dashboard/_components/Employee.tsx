"use client";
import { EmployeeDialog } from "@/components/dialog/EmployeeDialog";
import { Card } from "@/components/ui/card";
import { PlusCircle, UserCheck2 } from "lucide-react";
import { FaUserTie } from "react-icons/fa6";

type Props = {};

function Employee({}: Props) {
  const employee_quantity = 1891;
  const last_year_employee_quantity = 1532;
  return (
    <Card className="flex h-full flex-col px-4 py-2">
      <div className="flex h-1/2 items-center justify-between">
        <div className="flex gap-2">
          <div className="bg-primary-gradient flex h-10 w-10 items-center justify-center rounded-full border border-[2F0267]">
            <div className="text-primary-foreground">
              <FaUserTie size={24} />
            </div>
          </div>
          <div className="flex items-center text-large-bold">Employees</div>
        </div>
        <EmployeeDialog>
          <PlusCircle className="h-8 w-8 cursor-pointer text-primary transition delay-75 ease-in-out hover:scale-125 hover:fill-primary hover:text-primary-foreground" />
        </EmployeeDialog>
      </div>
      <div className="h-1/2">
        <p className="text-large-bold">{employee_quantity}</p>
        <p className="text-small-medium text-gray-400">
          Total employee last year were{" "}
          <span className="text-small-semibold text-secondary">
            {last_year_employee_quantity}
          </span>{" "}
          people
        </p>
      </div>
    </Card>
  );
}

export default Employee;
