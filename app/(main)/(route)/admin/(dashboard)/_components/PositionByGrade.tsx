"use client";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { generateColors } from "@/lib/utils";

export const description = "A stacked bar chart with a legend";

export function PositionByGrade({ data }: any) {
  const COLORS = generateColors(3);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Position By Grade</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} accessibilityLayer layout="vertical">
            <Legend
              align="center"
              verticalAlign="top"
              formatter={renderColorfulLegendText}
              wrapperStyle={{ paddingBottom: "10px" }}
            />
            <XAxis type="number" />
            <YAxis
              dataKey="unit"
              type="category"
              scale="auto"
              interval={0}
              tick={<CustomYAxisTick />}
              width={80}
            />
            <Tooltip />
            <Bar dataKey="Junior" stackId="a" fill={COLORS[0]} />
            <Bar dataKey="Mid-Level" stackId="a" fill={COLORS[1]} />
            <Bar
              dataKey="Senior"
              stackId="a"
              fill={COLORS[2]}
              radius={[0, 2, 2, 0]}
            />
          </BarChart>
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
