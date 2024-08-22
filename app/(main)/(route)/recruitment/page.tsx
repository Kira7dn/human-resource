import { promises as fs } from "fs";
import path from "path";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecruitValidation } from "@/lib/validations";
import { z } from "zod";

// Simulate a database read for tasks.
async function getRecruits() {
  const data = await fs.readFile(
    path.join(process.cwd(), "constants/recruitment/data.json"),
  );
  const recruit = JSON.parse(data.toString());
  return z.array(RecruitValidation).parse(recruit);
}

export default async function Component() {
  const recruits = await getRecruits();
  return (
    <div className="mx-auto grid w-full max-w-6xl items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recruits.map((recruit) => (
        <Card key={recruit._id} className="flex flex-col">
          <CardHeader className="">
            <CardTitle className="truncate pb-2 text-base-semibold">
              {recruit.position}
            </CardTitle>
            <CardDescription className="mb-auto line-clamp-5 overflow-ellipsis">
              <span>Department: {recruit.department}</span>
              <br />
              <span>{recruit.description}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto p-4">
            <div className="flex space-x-2 text-small-medium">
              <Badge variant="outline" className="py-0">
                Full-time
              </Badge>
              <Badge variant="outline">Remote</Badge>
              <Badge variant="outline">Senior</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex w-full flex-col justify-between">
              <div className="text-small-semibold font-bold capitalize">
                Salary: {recruit.salary}
              </div>
              <div className="text-tiny-medium capitalize text-gray-500 dark:text-gray-400">
                Expire date: {recruit.expried_date.toLocaleDateString("en-US")}
              </div>
            </div>
            <Button size="sm" className="p-1">
              Detail
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
