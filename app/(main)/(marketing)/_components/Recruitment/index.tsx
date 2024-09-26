import { getAllRecruits } from "@/lib/actions/recruit.actions";
import Bounded from "../Bounded";
import RecruitmentList from "./RecruitmentList";
import { RecruitDialog } from "@/components/dialog/RecruitDialog";
import { Button } from "@/components/ui/button";
import ButtonLink from "../ButtonLink";

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
      <h2 className="text-balance text-center text-heading4-bold font-medium md:text-heading3-bold">
        Current hiring
      </h2>
      <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-heading3-bold not-italic text-transparent">
        Ease and Precision
      </em>
      <RecruitDialog>
        <div className="z-40">
          <Button
            size="sm"
            className="relative inline-flex h-fit w-fit rounded-full border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-blue-200 outline-none ring-yellow-300 transition-colors after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-yellow-100 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 hover:border-yellow-200/40 hover:text-yellow-300 after:hover:bg-opacity-10 focus:ring-2 focus:ring-offset-2"
          >
            Create Recruit
          </Button>
        </div>
      </RecruitDialog>
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300"></div>
      <RecruitmentList recruits={recruits} />
    </Bounded>
  );
}
