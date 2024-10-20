"use client";

import * as React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateColors } from "@/lib/utils";

export const description = "A donut chart with text";

export function CandidateDesignate({
  data,
}: {
  data: {
    _id: string;
    total: number;
  }[];
}) {
  const COLORS = generateColors(data.length);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Candidate Designate</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Legend
              align="center"
              verticalAlign="top"
              formatter={renderColorfulLegendText}
            />
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="100%"
              outerRadius="130%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="total"
              nameKey="_id"
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              activeIndex={activeIndex}
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
      </CardContent>
    </Card>
  );
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
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
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-body-bold"
      >
        {payload._id}
      </text>
      <text
        x={cx}
        y={cy - 30}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-heading4-bold"
      >
        {payload.total}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
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
