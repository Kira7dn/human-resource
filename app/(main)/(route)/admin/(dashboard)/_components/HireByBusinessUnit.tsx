"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { data: { unit: string; request: number }[] };
export function HireByBusinessUnit({ data }: Props) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Hire request by Business Unit</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data}>
            <XAxis type="number" />
            <YAxis
              dataKey="unit"
              type="category"
              scale="auto"
              interval={0}
              tick={<CustomYAxisTick />}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                textTransform: "capitalize",
              }}
            />
            <Bar
              dataKey="request"
              fill="var(--primary)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-100} y={-10} width={90} height={20}>
        <div
          className="truncate text-tiny-medium"
          style={{ textAlign: "right" }}
        >
          {payload.value}
        </div>
      </foreignObject>
    </g>
  );
};
