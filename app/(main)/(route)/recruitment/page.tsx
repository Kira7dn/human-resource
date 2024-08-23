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
import { getAllRecruits } from "@/lib/actions/recruit.actions";

export default async function Component() {
  const recruits = await getAllRecruits();

  return (
    <div className="mx-auto grid w-full max-w-6xl items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recruits ? (
        recruits.map((recruit) => (
          <Card key={recruit._id} className="flex flex-col">
            <CardHeader className="">
              <CardTitle className="truncate pb-2 text-base-semibold">
                {recruit.position}
              </CardTitle>
              <CardDescription className="mb-auto line-clamp-5 overflow-ellipsis">
                {typeof recruit.department === "object" && (
                  <span>Department: {recruit.department.name}</span>
                )}
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
                  Expire date:{" "}
                  {recruit.expried_date.toLocaleDateString("en-US")}
                </div>
              </div>
              <Button size="sm" className="p-1">
                Detail
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-2xl text-gray-500 dark:text-gray-400">
            No recruit available
          </p>
        </div>
      )}
    </div>
  );
}
