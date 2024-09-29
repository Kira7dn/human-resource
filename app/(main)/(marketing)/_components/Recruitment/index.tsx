import { getAllRecruits } from "@/lib/actions/recruit.actions";
import Bounded from "../Bounded";
import RecruitmentList from "./RecruitmentList";
import { RecruitDialog } from "@/components/dialog/RecruitDialog";
import { Button } from "@/components/ui/button";

export default async function Bento() {
  const recruits = await getAllRecruits();
  if (!recruits) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <p className="text-2xl text-gray-500 dark:text-gray-400">
          No recruit available
        </p>
      </div>
    );
  }

  return (
    <Bounded>
      <div
        className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300"
        id="recruitment"
      ></div>
      <h2 className="text-balance text-center text-heading4-bold font-medium md:text-heading3-bold">
        Current hiring
      </h2>
      <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-heading3-bold not-italic text-transparent">
        Ease and Precision
      </em>
      <RecruitmentList recruits={recruits} />
    </Bounded>
  );
}
