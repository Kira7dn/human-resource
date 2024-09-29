import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaUserClock } from "react-icons/fa6";

type Props = {};

function Candidate({}: Props) {
  const candidate_quantity = 1891;
  const last_year_candidate_quantity = 1532;
  return (
    <Card className="flex h-full flex-col px-4 py-2">
      <div className="flex h-1/2 items-center justify-between">
        <div className="flex gap-2">
          <div className="bg-secondary-gradient flex h-10 w-10 items-center justify-center rounded-full border border-[2F0267]">
            <div className="text-primary-foreground">
              <FaUserClock size={24} />
            </div>
          </div>
          <div className="flex items-center text-large-bold">Candidates</div>
        </div>
        <Link href="/admin/recruitment">
          <PlusCircle className="h-8 w-8 cursor-pointer text-secondary transition delay-75 ease-in-out hover:scale-125 hover:fill-secondary hover:text-secondary-foreground" />
        </Link>
      </div>
      <div className="h-1/2">
        <p className="text-large-bold">{candidate_quantity}</p>
        <p className="text-small-medium text-gray-400">
          Total candidates last year were{" "}
          <span className="text-small-semibold text-secondary">
            {last_year_candidate_quantity}
          </span>{" "}
          people
        </p>
      </div>
    </Card>
  );
}

export default Candidate;
