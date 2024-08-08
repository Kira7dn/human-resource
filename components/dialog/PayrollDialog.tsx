"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui//scroll-area";
import { useState } from "react";
import "./payroll-slip.css";

export const PayrollDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <ScrollArea className="h-[80vh] rounded-md">
          <div className="bg-white px-8 py-4">
            <div className="mb-2 text-heading4-bold">Payslip</div>
            <div className="flex justify-start border-y border-[#ccc] py-2">
              <div className="">
                <div className="text-body-normal">PAY PERIOD</div>
                <div className="text-body-semibold">Feb 15 - Mar 15, 2024</div>
              </div>
            </div>
            <div className="flex justify-between border-b border-[#ccc]">
              <div className="flex min-w-56 flex-col gap-4 border-r border-[#ccc] pr-5">
                <div className="py-2">
                  <div className="text-body-bold">Piven El'Sync</div>
                  <div className="text-small-medium">
                    mary.ann+Regr06@salarium.com
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Employee ID
                    </div>
                    <div className="max-w-24 truncate text-end text-small-regular">
                      Reg-006
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Date Hired
                    </div>
                    <div className="max-w-24 truncate text-end text-small-regular">
                      Dec 1, 1862
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Position
                    </div>
                    <div className="max-w-24 truncate text-end text-small-regular">
                      Point Guard
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">
                      Department
                    </div>
                    <div className="max-w-24 truncate text-end text-small-regular">
                      1st String
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-start text-small-semibold">Level</div>
                    <div className="max-w-24 truncate text-end text-small-regular">
                      Junior
                    </div>
                  </div>
                </div>
                <div className="gross">
                  <div className="title">Gross Income</div>
                  <div className="entry">
                    <div className="label"></div>
                    <div className="value">92,823.86</div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="details">
                  <div className="basic-pay">
                    <div className="entry">
                      <div className="label">Basic Pay</div>
                      <div className="amount">45,000.00</div>
                    </div>
                  </div>
                  <div className="salary">
                    <div className="entry">
                      <div className="label">Salary</div>
                      <div className="detail"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Undertime</div>
                      <div className="amount">(33,231.36)</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Unworked Holiday</div>
                      <div className="amount">4,153.92</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">
                        Regular Holiday Regular Holiday
                      </div>
                      <div className="amount">7,009.65</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">
                        Regular Holiday Regular Holiday Night
                      </div>
                      <div className="amount">5,997.11</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Night</div>
                      <div className="amount">15,992.59</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Regular Holiday</div>
                      <div className="amount">4,673.07</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Regular Holiday Night</div>
                      <div className="amount">3,998.05</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">
                        Regular Holiday Night Overtime
                      </div>
                      <div className="amount">1,485.00</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Special Holiday</div>
                      <div className="amount">3,037.50</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Special Holiday Night</div>
                      <div className="amount">2,598.75</div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Rest Day</div>
                      <div className="amount">2,700.00</div>
                    </div>
                  </div>
                  <div className="leaves">
                    <div className="entry">
                      <div className="label">Leaves</div>
                      <div className="detail"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry paid">
                      <div className="label"></div>
                      <div className="detail">Paid Leave</div>
                      <div className="amount">2,076.92</div>
                    </div>
                    <div className="entry unpaid">
                      <div className="label"></div>
                      <div className="detail">Unpaid Leave</div>
                      <div className="amount">(2076.96)</div>
                    </div>
                  </div>
                  <div className="taxable_allowance">
                    <div className="entry">
                      <div className="label">Taxable Allowance</div>
                      <div className="detail"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Allowance Name</div>
                      <div className="amount">1,000.00</div>
                    </div>
                  </div>
                  <div className="taxable_bonus">
                    <div className="entry">
                      <div className="label">Taxable Bonus</div>
                      <div className="detail"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Bonus Name</div>
                      <div className="amount">19,409.34</div>
                    </div>
                  </div>
                  <div className="taxable_commission"></div>

                  <div className="nti">
                    <div className="entry">
                      <div className="label">TAXABLE INCOME</div>
                      <div className="detail"></div>
                      <div className="amount">82,705.06</div>
                    </div>
                  </div>
                  <div className="withholding_tax">
                    <div className="entry">
                      <div className="label">Withholding Tax</div>
                      <div className="detail"></div>
                      <div className="amount">(21,548.85)</div>
                    </div>
                  </div>
                  <div className="non_taxable_allowance">
                    <div className="entry">
                      <div className="label">Non-Taxable Allowance</div>
                      <div className="detail"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Allowance Name</div>
                      <div className="rate"></div>
                      <div className="amount">1,500.00</div>
                    </div>
                  </div>
                  <div className="non_taxable_bonus">
                    <div className="entry">
                      <div className="label">Non-Taxable Bonus</div>
                      <div className="detail"></div>
                      <div className="rate"></div>
                      <div className="amount"></div>
                    </div>
                    <div className="entry">
                      <div className="label"></div>
                      <div className="detail">Bonus Name</div>
                      <div className="rate"></div>
                      <div className="amount">2,000.00</div>
                    </div>
                  </div>

                  <div className="net_pay">
                    <div className="entry">
                      <div className="label">NET PAY</div>
                      <div className="detail"></div>
                      <div className="rate"></div>
                      <div className="amount">69,656.21</div>
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
