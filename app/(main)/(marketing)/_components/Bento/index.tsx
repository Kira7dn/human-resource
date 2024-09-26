import { getAllRecruits } from "@/lib/actions/recruit.actions";
import Bounded from "../Bounded";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Bento() {
  const recruits = await getAllRecruits();

  return (
    <Bounded>
      <h2 className="text-balance text-center text-heading4-bold font-medium md:text-heading3-bold">
        Current hiring
      </h2>
      <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-heading3-bold not-italic text-transparent">
        Ease and Precision
      </em>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300"></div>
      <div className="z-10 mt-16 grid max-w-7xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {recruits ? (
          recruits.map((recruit) => (
            <div>
              <div
                className="glass-container row-span-5 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-1"
                key={recruit._id}
              >
                <h3 className="text-2xl">{recruit.position}</h3>
                <div className="max-w-md text-balance text-slate-300">
                  {/* {typeof recruit.department === "object" && (
                  <div className="text-small-semibold">
                    Department: {recruit.department.name}
                  </div>
                )} */}
                  <p className="line-clamp-6 text-tiny-medium">
                    {recruit.description}
                  </p>
                </div>

                <div className="flex w-80 justify-between text-small-semibold">
                  <div className="text-small-semibold font-bold capitalize">
                    Salary: {recruit.salary}
                  </div>
                  <div className="text-tiny-medium capitalize text-gray-500 dark:text-gray-400">
                    Expire date:
                    {recruit.expried_date.toLocaleDateString("en-US")}
                  </div>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Button size="lg" className="">
                    <Link href={`/recruitment/${recruit._id}`}>Detail</Link>
                  </Button>
                </div>
                {/* <CardFooter className="flex justify-between">
                <div className="flex w-full flex-col justify-between">
                  <div className="text-small-semibold font-bold capitalize">
                    Salary: {recruit.salary}
                  </div>
                  <div className="text-tiny-medium capitalize text-gray-500 dark:text-gray-400">
                    Expire date:{" "}
                    {recruit.expried_date.toLocaleDateString("en-US")}
                  </div>
                </div>
                <Button size="sm" className="p-1">
                  <Link href={`/recruitment/${recruit._id}`}>Detail</Link>
                </Button>
              </CardFooter> */}
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-96 w-full items-center justify-center">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No recruit available
            </p>
          </div>
        )}
      </div>
    </Bounded>
  );
}
