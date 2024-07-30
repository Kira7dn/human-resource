import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {};

function InterviewSchedule({}: Props) {
  const data = [
    {
      name: "Shad Chnev",
      image: "",
      position: "Software Engineer",
      level: "Senior",
      interview: "Technical Interview",
      appointment_datetime: "2022-10-10 10:00:00",
    },
    {
      name: "Jane Doe",
      image: "https://example.com/jane.jpg",
      position: "Product Manager",
      level: "Mid-Level",
      interview: "Managerial Interview",
      appointment_datetime: "2022-11-15 14:00:00",
    },
    {
      name: "John Smith",
      image: "https://example.com/john.png",
      position: "UI/UX Designer",
      level: "Junior",
      interview: "Design Interview",
      appointment_datetime: "2022-12-01 09:30:00",
    },
    {
      name: "Alice Johnson",
      image: "https://example.com/alice.jpg",
      position: "Data Scientist",
      level: "Senior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-02 10:00:00",
    },
    {
      name: "Bob Brown",
      image: "https://example.com/bob.jpg",
      position: "DevOps Engineer",
      level: "Mid-Level",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-03 11:30:00",
    },
    {
      name: "Carol King",
      image: "https://example.com/carol.jpg",
      position: "Project Manager",
      level: "Senior",
      interview: "Managerial Interview",
      appointment_datetime: "2022-12-04 09:00:00",
    },
    {
      name: "Dave Wilson",
      image: "https://example.com/dave.jpg",
      position: "Backend Developer",
      level: "Junior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-05 14:00:00",
    },
    {
      name: "Eva Green",
      image: "https://example.com/eva.jpg",
      position: "Frontend Developer",
      level: "Mid-Level",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-06 10:30:00",
    },
    {
      name: "Frank Moore",
      image: "https://example.com/frank.jpg",
      position: "Cybersecurity Specialist",
      level: "Senior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-07 15:00:00",
    },
    {
      name: "Grace Hall",
      image: "https://example.com/grace.jpg",
      position: "Mobile Developer",
      level: "Junior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-08 11:00:00",
    },
    {
      name: "Henry White",
      image: "https://example.com/henry.jpg",
      position: "Cloud Architect",
      level: "Senior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-09 09:30:00",
    },
    {
      name: "Ivy Black",
      image: "https://example.com/ivy.jpg",
      position: "System Analyst",
      level: "Mid-Level",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-10 14:30:00",
    },
    {
      name: "Jack Fisher",
      image: "https://example.com/jack.jpg",
      position: "Quality Assurance Engineer",
      level: "Junior",
      interview: "Technical Interview",
      appointment_datetime: "2022-12-11 10:00:00",
    },
  ];

  return (
    <Card className="flex h-full flex-col">
      <div className="p-4 pb-0">
        <p className="text-large-bold">Interview Schedule</p>
      </div>
      <ScrollArea className="h-full p-4">
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <Interview interview_data={item} key={index} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

export default InterviewSchedule;

type InterviewProps = {
  interview_data: {
    name: string;
    image: string;
    position: string;
    level: string;
    interview: string;
    appointment_datetime: string;
  };
};

const Interview = ({ interview_data }: InterviewProps) => {
  const date = new Date(interview_data.appointment_datetime);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const appointment_datetime = date.toLocaleDateString("en-US", options);
  const fallback_name = interview_data.name.split(" ").map((n) => n[0]);
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-lg border p-2 hover:bg-gray-200">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={interview_data.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{fallback_name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base-semibold">{interview_data.name}</p>
          <div className="flex gap-4">
            <p className="max-w-32 truncate text-small-medium text-gray-500">
              {interview_data.position}
            </p>
            <p className="truncate text-small-medium text-gray-500">
              {appointment_datetime}
            </p>
          </div>
        </div>
      </div>
      <ChevronRight />
    </div>
  );
};
