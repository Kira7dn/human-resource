"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { get_tax_level } from "@/lib/utils";
import { months } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PayrollType } from "@/lib/validations";

export const PayrollDialog = ({
  payroll,
  open,
  setOpen,
}: {
  payroll: PayrollType;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const {
    employee,
    period,
    gross_salary,
    position_allowance,
    travel_allowance,
    work_day,
    overtime,
    paid_leave,
    unpaid_leave,
  } = payroll;
  const format_hired_date = new Date(
    typeof employee !== "string" && employee.hired_date
      ? employee.hired_date
      : "",
  ).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const pay_period = new Date(period).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const work_hour = 8;
  const work_days = 24;
  const basic_salary = 9000000;
  const basic_tax_reduction = 11000000;
  const hour_salary = (gross_salary ?? 0) / (work_hour * work_days);
  const overtime_salary = (overtime ?? 0) * 1.5 * hour_salary;
  const paid_leave_salary =
    ((paid_leave ?? 0) * (gross_salary ?? 0)) / work_days;
  const unpaid_leave_salary =
    (-(unpaid_leave ?? 0) * (gross_salary ?? 0)) / work_days;
  const total_income =
    (gross_salary ?? 0) -
    unpaid_leave_salary +
    overtime_salary +
    (position_allowance ?? 0) +
    (travel_allowance ?? 0);
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
                  <div className="text-body-bold">
                    {typeof employee !== "string" && employee.name}
                  </div>
                  <div className="text-small-medium">
                    {typeof employee !== "string" && employee.email}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <div className="text-start text-small-semibold">
                      Date Hired
                    </div>
                    <div className="truncate pl-4 text-small-regular">
                      {format_hired_date}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-start text-small-semibold">
                      Position
                    </div>
                    <div className="truncate pl-4 text-small-regular">
                      {typeof employee !== "string" && employee.position}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-start text-small-semibold">Level</div>
                    <div className="truncate pl-4 text-small-regular">
                      {typeof employee !== "string" && employee.level}
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
                        {(gross_salary ?? 0).toLocaleString("en-US")}
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
                        Unpaid leave (
                        {Array.isArray(unpaid_leave)
                          ? unpaid_leave.length
                          : unpaid_leave}{" "}
                        days)
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
                        {(position_allowance ?? 0).toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Travel</div>
                      <div className="">
                        {(travel_allowance ?? 0).toLocaleString("en-US")}
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
