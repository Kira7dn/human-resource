"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { Payroll } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { get_tax_level } from "@/lib/utils";
import { months } from "@/constants";

export const PayrollDialog = ({
  payroll,
  children,
}: {
  payroll: Payroll;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const {
    id,
    month,
    name,
    email,
    position,
    level,
    department,
    hired_date,
    gross_salary,
    overtime,
    paid_leave,
    unpaid_leave,
    position_allowance,
    travel_allowance,
  } = payroll;
  const format_hired_date = new Date(hired_date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const pay_period = `15-${months[month - 1]} to 15-${months[month]}`;
  const work_hour = 8;
  const work_day = 24;
  const basic_salary = 9000000;
  const basic_tax_reduction = 11000000;
  const hour_salary = gross_salary / (work_hour * work_day);
  const overtime_salary = overtime * 1.5 * hour_salary;
  const paid_leave_salary = (paid_leave * gross_salary) / work_day;
  const unpaid_leave_salary = (-unpaid_leave * gross_salary) / work_day;
  const total_income =
    gross_salary -
    unpaid_leave_salary +
    overtime_salary +
    position_allowance +
    travel_allowance;
  const social_insurance = total_income * 0.08;
  const health_insurance = total_income * 0.015;
  const unemployment_insurance = total_income * 0.01;
  const taxable_income =
    total_income -
    basic_salary -
    unemployment_insurance -
    health_insurance -
    unemployment_insurance -
    basic_tax_reduction;
  const income_tax = get_tax_level(taxable_income);
  const net_pay = total_income - income_tax;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader></DialogHeader>
        <ScrollArea className="h-[80vh] rounded-md">
          <div className="bg-white px-8 py-4 ">
            <div className="flex justify-between">
              <div className="mb-2 flex items-center justify-start gap-2">
                <Image
                  src="/assets/logo.svg"
                  height={32}
                  width={32}
                  alt="Logo"
                  className="dark:hidden"
                  priority
                />

                <div className="text-heading4-bold">Payroll slip</div>
              </div>
              <div>
                <Image
                  src="/assets/confidential.png"
                  alt="confidential"
                  width={160}
                  height={40}
                  className="rotate-12"
                />
              </div>
            </div>
            <div className="flex justify-start border-y border-[#ccc] py-2">
              <div className="">
                <div className="text-body-normal">PAY PERIOD</div>
                <div className="text-body-semibold">{pay_period}</div>
              </div>
            </div>
            <div className="flex justify-between border-b border-[#ccc]">
              <div className="flex min-w-72 flex-col gap-4 border-r border-[#ccc] pr-5">
                <div className="py-2">
                  <div className="text-body-bold">{name}</div>
                  <div className="text-small-medium">{email}</div>
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Employee ID
                    </div>
                    <div className="max-w-32 truncate text-end text-small-regular">
                      {id}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Date Hired
                    </div>
                    <div className="max-w-32 truncate text-end text-small-regular">
                      {format_hired_date}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Position
                    </div>
                    <div className="max-w-32 text-end text-small-regular">
                      {position}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Department
                    </div>
                    <div className="max-w-32 truncate text-end text-small-regular">
                      {department}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">Level</div>
                    <div className="max-w-32 truncate text-end text-small-regular">
                      {level}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 px-3 pb-2">
                <div className="flex flex-col">
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Salary</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Basic Salary (24 days)</div>
                      <div className="">
                        {gross_salary.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Overtime ({overtime} hours)</div>
                      <div className="">
                        {Math.floor(overtime_salary).toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Leave</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Paid leave ({paid_leave} days)</div>
                      <div className="">
                        {Math.floor(paid_leave_salary).toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">
                        Unpaid leave ({unpaid_leave} days)
                      </div>
                      <div className="">
                        {Math.floor(unpaid_leave_salary).toLocaleString(
                          "en-US",
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Allowance</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Position</div>
                      <div className="">
                        {position_allowance.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Travel</div>
                      <div className="">
                        {travel_allowance.toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between bg-black  bg-opacity-5 text-base-semibold">
                    <div className="label">TOTAL INCOME</div>
                    <div className="amount">
                      {Math.floor(total_income).toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Tax & Insurance</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Social Insurance (8%)</div>
                      <div className="">
                        {Math.floor(social_insurance).toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Health Insurance (1.5%)</div>
                      <div className="">
                        {Math.floor(health_insurance).toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Unemployment insurance (1%)</div>
                      <div className="">
                        {Math.floor(unemployment_insurance).toLocaleString(
                          "en-US",
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Income Tax</div>
                      <div className="">
                        {Math.floor(income_tax).toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between bg-black  bg-opacity-5 text-base-semibold">
                    <div className="label">NET PAY</div>
                    <div className="amount">
                      {Math.floor(net_pay).toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
