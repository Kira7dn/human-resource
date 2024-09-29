import { EmployeeDialog } from "@/components/dialog/EmployeeDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllCandidates } from "@/lib/actions/candidate.actions";
import { Candidate as CandidateType } from "@/lib/validations";
import { statuses } from "@/constants";
import { CandidateDialog } from "@/components/dialog/CandidateDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";

type Props = {};

async function InterviewSchedule({}: Props) {
  const filter = {
    status: "waiting",
    interview_date: { $gt: Date.now() }, // Example of a comparison filter
  };
  const data = await getAllCandidates(filter);
  return (
    <Card className="flex h-full flex-col">
      <div className="p-4 pb-0">
        <p className="text-large-bold">Interview Schedule</p>
      </div>
      <ScrollArea className="h-full p-4">
        <div className="flex flex-col gap-2">
          {data && data.length > 0 ? (
            data.map((item) => <Interview data={item} key={item._id} />)
          ) : (
            <div className="mx-auto">Interview no found</div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}

export default InterviewSchedule;

const Interview = ({ data }: { data: CandidateType }) => {
  const date = new Date(data.interview_date ?? "");
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const appointment_datetime = date.toLocaleDateString("en-US", options);
  const fallback_name = data.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const department =
    typeof data.recruit === "object" &&
    typeof data.recruit.department === "object" &&
    data.recruit.department &&
    "name" in data.recruit.department
      ? data.recruit.department.name
      : "";
  const initial_employee_data = {
    image: data.image,
    name: data.name,
    email: data.email,
    birthDate: data.birthDate,
    phone: data.phone,
    gender: data.gender,
    address: data.address,
    position: typeof data.recruit === "object" ? data.recruit.position : "",
    level: typeof data.recruit === "object" ? data.recruit.level : "",
    department: typeof data.recruit === "object" ? data.recruit.department : "",
    status: statuses[0].value,
    hired_date: new Date(),
  };
  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={data.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{fallback_name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base-semibold">{data.name}</p>
          <div className="flex gap-4">
            <p className="max-w-32 truncate text-small-medium text-gray-500">
              {department}
            </p>
            <p className="truncate text-small-medium text-gray-500">
              {appointment_datetime}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <CandidateDialog candidate={data}>
              <TbEdit className="h-5 w-5 cursor-pointer text-secondary transition delay-75 ease-in-out hover:scale-125 hover:fill-secondary hover:text-secondary-foreground" />
            </CandidateDialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Interview</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={200}>
          <TooltipTrigger>
            <EmployeeDialog employee={initial_employee_data}>
              <FiCheckCircle className="h-5 w-5 cursor-pointer text-primary transition delay-75 ease-in-out hover:scale-125 hover:fill-primary hover:text-primary-foreground" />
            </EmployeeDialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add employee</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
