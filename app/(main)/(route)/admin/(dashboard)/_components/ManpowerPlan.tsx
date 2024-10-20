"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
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

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

export default function ManpowerPlan() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Manpower plan</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip cursor={false} />
            <Legend
              align="right"
              verticalAlign="top"
              formatter={renderColorfulLegendText}
            />
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;

  return (
    <span style={{ color }} className="text-tiny-semibold capitalize">
      {value}
    </span>
  );
};
