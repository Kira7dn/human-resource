"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  {
    month: "January",
    employee: 186,
    candidate: 80,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "February",
    employee: 305,
    candidate: 200,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "March",
    employee: 237,
    candidate: 120,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "April",
    employee: 73,
    candidate: 190,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "May",
    employee: 209,
    candidate: 130,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "June",
    employee: 214,
    candidate: 140,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "July",
    employee: 273,
    candidate: 270,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "August",
    employee: 121,
    candidate: 150,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "September",
    employee: 112,
    candidate: 100,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "October",
    employee: 89,
    candidate: 120,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "November",
    employee: 123,
    candidate: 80,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
  {
    month: "December",
    employee: 67,
    candidate: 40,
    plan: Math.floor(Math.random() * (400 - 270)) + 270,
  },
];

const chartConfig = {
  employee: {
    label: "employee",
    color: "hsl(var(--chart-1))",
  },
  candidate: {
    label: "candidate",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ManpowerPlan() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="">
        <CardTitle className="text-large-bold">Manpower Plan</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="w-full px-4 pb-2">
        <ComposedChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend align="right" content={<ChartLegendContent />} />
          <Bar
            dataKey="employee"
            stackId="a"
            fill="var(--primary)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="candidate"
            stackId="a"
            fill="var(--secondary)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            dataKey="plan"
            type="monotone"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{
              fill: "var(--secondary)",
            }}
            activeDot={{
              r: 6,
            }}
          />
        </ComposedChart>
      </ChartContainer>
    </Card>
  );
}
