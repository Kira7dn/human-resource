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
import { Recruit } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Simulate a database read for tasks.
async function getRecruits() {
  const data = await fs.readFile(
    path.join(process.cwd(), "constants/recruitment/data.json"),
  );
  const recruit = JSON.parse(data.toString()) as Recruit[];
  return recruit;
}

export default async function Component() {
  const recruits = await getRecruits();
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recruits.map((recruit) => (
        <Card key={recruit.id}>
          <CardHeader className="">
            <CardTitle className="truncate pb-2 text-base-semibold">
              {recruit.position}
            </CardTitle>
            <CardDescription className="line-clamp-5 overflow-ellipsis">
              <span>Department: {recruit.department}</span>
              <br />
              <span>
                Dolor excepteur aliquip dolore cupidatat eiusmod dolor non
                voluptate. Ad nulla ea quis aute consectetur nulla ut
                consectetur dolore in consectetur.onsectetur dolore in
                consectetur.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
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
                Expire date: {recruit.expried_date}
              </div>
            </div>
            <Button size="sm">Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
