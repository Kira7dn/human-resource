import { CandidateDialog } from "@/components/dialog/CandidateDialog";
import { RecruitDialog } from "@/components/dialog/RecruitDialog";
import { Button } from "@/components/ui/button";
import { getRecruitById } from "@/lib/actions/recruit.actions";

export default async function Page({ params }: { params: { id: string } }) {
  const recruit = await getRecruitById(params.id);
  if (!recruit)
    return (
      <div className="p-4">
        <p>Recruit not found</p>
      </div>
    );
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b py-2 text-body-semibold">
        <p>{recruit.position}</p>
        <div className="flex gap-2">
          <CandidateDialog recruitment={recruit}>
            <Button size="sm">Apply</Button>
          </CandidateDialog>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-base-medium ">
              <span className="mr-2 text-base-semibold uppercase underline">
                Salary:
              </span>
              <span className="text-base-medium capitalize">
                {recruit.salary}
              </span>
            </p>
            <p className="text-base-medium ">
              <span className="mr-2 text-base-semibold uppercase underline">
                Level:
              </span>
              <span className="text-base-medium">{recruit.level}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base-medium ">
              <span className="mr-2 text-base-semibold uppercase underline">
                Quantity:
              </span>
              <span className="">{recruit.quantity}</span>
            </p>
            <p className="text-base-medium ">
              <span className="mr-2 text-base-semibold uppercase underline">
                Expired date:
              </span>
              <span className="text-base-medium">
                {recruit.expried_date.toLocaleDateString("en-US")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <p className="text-base-semibold uppercase underline">
          Job Description:
        </p>
        <pre className="pl-2 font-sans">{recruit.description}</pre>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <p className="text-base-semibold uppercase underline">Requirements:</p>
        <pre className="pl-2 font-sans">{recruit.requirements}</pre>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <p className="text-base-semibold uppercase underline">
          Benefit & Welfare:
        </p>
        <pre className="pl-2 font-sans">
          - Working environment in the Top 100 Best Places to Work in Vietnam
          <br />- Attractive salary, administrative working hours from Monday to
          Friday, overtime according to the law. <br />- Daily shuttle bus for
          employees, meals (free) at the factory <br />- Opportunity to study &
          be trained abroad <br />- Participate in Insurance (Social Insurance,
          Health Insurance, Unemployment Insurance).
          <br />- Enjoy bonus policies & annual salary increase evaluation
          according to the Company's regulations
        </pre>
      </div>
    </div>
  );
}
