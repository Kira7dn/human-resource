"use client";

import * as React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { generateColors } from "@/lib/utils";

type Props = {
  data: {
    _id: string;
    count: number;
  }[];
};
export function EmployeeGenderTotal({ data }: Props) {
  const totalEmployees = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, []);
  const COLORS = generateColors(data.length);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Employees By Genders</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 justify-between px-1 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                textTransform: "capitalize",
              }}
            />
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              formatter={renderColorfulLegendText}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={0}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex w-1/2 flex-col items-center justify-center">
          <div className="text-body-bold">Total Employees</div>
          <div className="text-heading2-bold">{totalEmployees}</div>
        </div>
      </CardContent>
    </Card>
  );
}

const renderLabel = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  // Calculate the center position for the image
  const imageWidth = 60;
  const imageHeight = 60;
  const x = cx - imageWidth / 2;
  const y = cy - imageHeight / 2;

  return (
    <g>
      <image
        href="/assets/genders.svg"
        width={imageWidth}
        height={imageHeight}
        x={x}
        y={y}
        dy={8}
      />
    </g>
  );
};
const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;

  return (
    <span style={{ color }} className="text-tiny-semibold capitalize">
      {value}
    </span>
  );
};
