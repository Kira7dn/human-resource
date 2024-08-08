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
import Image from "next/image";

export const PayrollDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

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

                <div className="text-heading4-bold">Payslip</div>
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
                <div className="text-body-semibold">Feb 15 - Mar 15, 2024</div>
              </div>
            </div>
            <div className="flex justify-between border-b border-[#ccc]">
              <div className="flex min-w-56 flex-col gap-4 border-r border-[#ccc] pr-5">
                <div className="py-2">
                  <div className="text-body-bold">Piven El'Sync</div>
                  <div className="text-small-medium">
                    maryannRegr06@salarium.com
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
              </div>
              <div className="flex w-full flex-col gap-2 px-3 pb-2">
                <div className="flex flex-col">
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Salary</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Basic Salary</div>
                      <div className="">1201511</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Overtime</div>
                      <div className="">1201511</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Holiday</div>
                      <div className="">1201511</div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Leave</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Paid leave</div>
                      <div className="">1201511</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Unpaid leave</div>
                      <div className="">(1201511)</div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Allowance</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Position</div>
                      <div className="">1201511</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Travel</div>
                      <div className="">(1201511)</div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between bg-black  bg-opacity-5 text-base-semibold">
                    <div className="label">TOTAL INCOME</div>
                    <div className="amount">82,705.06</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full flex-col">
                    <div className="text-base-medium">Tax & Insurance</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Social Insurance (8%)</div>
                      <div className="">(1201511)</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Health Insurance (1.5%)</div>
                      <div className="">(1201511)</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Unemployment insurance (1%)</div>
                      <div className="">(1201511)</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Income Tax</div>
                      <div className="">(1201511)</div>
                    </div>
                  </div>
                  {/* <div className="flex w-full flex-col">
                    <div className="text-base-medium">Other Reduction</div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Overtime</div>
                      <div className="">1201511</div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="pl-2">Holiday</div>
                      <div className="">1201511</div>
                    </div>
                  </div> */}
                  <div className="flex w-full justify-between bg-black  bg-opacity-5 text-base-semibold">
                    <div className="label">NET PAY</div>
                    <div className="amount">82,705.06</div>
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
