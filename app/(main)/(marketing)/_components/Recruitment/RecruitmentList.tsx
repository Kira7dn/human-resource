"use client";
import { Button } from "@/components/ui/button";
import { Recruit } from "@/lib/validations";
import React, { useState } from "react";
import ButtonLink from "../ButtonLink";

type Props = {
  recruits: Recruit[];
};

const RecruitmentList = ({ recruits }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleRecruits = showAll ? recruits : recruits.slice(0, 6);

  return (
    <>
      <div className="z-10 mt-16 grid max-w-7xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        {visibleRecruits.map((recruit) => (
          <div key={recruit._id}>
            <div
              className="glass-container row-span-5 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-1"
              key={recruit._id}
            >
              <div className="flex items-center justify-between">
                <div className="max-w-52 truncate text-body-bold">
                  {recruit.position}
                </div>
                <ButtonLink
                  className="!py-1"
                  href={`/recruitment/${recruit._id}`}
                >
                  Detail
                </ButtonLink>
              </div>
              <div className="max-w-md text-balance text-slate-300">
                <p className="line-clamp-6 text-tiny-medium">
                  {recruit.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="flex w-80 items-center justify-between text-small-semibold">
                <div className="text-small-semibold font-bold capitalize">
                  Salary: {recruit.salary}
                </div>
                <div className="text-small-medium capitalize text-gray-500 dark:text-gray-400">
                  Expire date:{" "}
                  {new Date(recruit.expried_date).toLocaleDateString("en-US")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!showAll && recruits.length > 3 && (
        <div className="flex w-full items-center justify-center">
          <Button size="lg" onClick={() => setShowAll(true)} variant="ghost">
            See more
          </Button>
        </div>
      )}
    </>
  );
};

export default RecruitmentList;
