import { CandidateDialog } from "@/components/dialog/CandidateDialog";
import { Button } from "@/components/ui/button";

const recruit = {
  id: "REC-9814",
  expried_date: new Date("2024-12-13"),
  quantity: 3,
  position: "Future Data Administrator",
  level: "Senior",
  department: "Mobile",
  salary: "negotiable",
  description:
    "-Cupidatat minim in eu laborum.\n-Non cupidatat Lorem quis quis ullamco.\n-Deserunt dolore dolor ex id et cillum nisi amet adipisicing sit nisi qui nisi id.\n-Pariatur incididunt sint quis irure adipisicing sunt nisi.\n-Consequat veniam fugiat sint sunt quis anim.\n-Veniam aliqua ad aliqua reprehenderit culpa laboris sint consectetur exercitation.\n-Eiusmod occaecat ut labore laborum commodo incididunt et pariatur reprehenderit velit exercitation eiusmod duis non.\n-Enim Lorem laborum commodo minim ipsum quis esse irure elit fugiat veniam exercitation cillum.\n-Laborum proident in mollit aute ea eu velit.Occaecat excepteur sunt nulla ipsum pariatur commodo ullamco reprehenderit reprehenderit.\n-Consequat elit tempor mollit culpa ad.\n-Occaecat laborum pariatur elit ea adipisicing pariatur.\n-Ea aliquip velit pariatur et aliquip et proident elit dolore quis commodo fugiat do labore.\n-Labore magna elit Lorem ad eiusmod esse est ad.",
  requirements:
    "-Cupidatat minim in eu laborum.\n-Non cupidatat Lorem quis quis ullamco.\n-Deserunt dolore dolor ex id et cillum nisi amet adipisicing sit nisi qui nisi id.\n-Pariatur incididunt sint quis irure adipisicing sunt nisi.\n-Consequat veniam fugiat sint sunt quis anim.\n-Veniam aliqua ad aliqua reprehenderit culpa laboris sint consectetur exercitation.\n-Eiusmod occaecat ut labore laborum commodo incididunt et pariatur reprehenderit velit exercitation eiusmod duis non.\n-Enim Lorem laborum commodo minim ipsum quis esse irure elit fugiat veniam exercitation cillum.\n-Laborum proident in mollit aute ea eu velit.Occaecat excepteur sunt nulla ipsum pariatur commodo ullamco reprehenderit reprehenderit.\n-Consequat elit tempor mollit culpa ad.\n-Occaecat laborum pariatur elit ea adipisicing pariatur.\n-Ea aliquip velit pariatur et aliquip et proident elit dolore quis commodo fugiat do labore.\n-Labore magna elit Lorem ad eiusmod esse est ad.",
};
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-b py-2 text-body-semibold">
        <p>{recruit.position}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
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
          Health Insurance, Unemployment Insurance) & 24/24 Accident Insurance.{" "}
          <br />- Enjoy bonus policies & annual salary increase evaluation
          according to the Company's regulations
        </pre>
      </div>
    </div>
  );
}
