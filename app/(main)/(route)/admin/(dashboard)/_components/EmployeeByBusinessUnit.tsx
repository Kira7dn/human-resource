"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateColors } from "@/lib/utils";
import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";

type Props = {
  data: {
    _id: string;
    count: number;
  }[];
};
export const EmployeeByBusinessUnit = ({ data }: Props) => {
  const COLORS = generateColors(data.length);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-2 pt-4">
        <CardTitle>Employee By Business Unit</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center">
        <ResponsiveContainer width="100%" height="100%" aspect={300 / 200}>
          <Treemap
            data={data}
            dataKey="count"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  colors,
  _id,
  count,
}: any) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[
                  Math.floor((index / root.children.length) * colors.length)
                ]
              : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fill: "#fff",
            stroke: "#000",
            strokeWidth: 0.1,
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
          textLength={width - 14}
          lengthAdjust="spacingAndGlyphs"
          clipPath={`url(#clip-${index})`}
        >
          {_id}
        </text>
      ) : null}
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 14}
          fill="#fff"
          fontSize={10}
          fillOpacity={0.9}
          style={{
            fontSize: 10,
            fontWeight: "bold",
            fill: "#fff",
            stroke: "#000",
            strokeWidth: 0.1,
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          {count}
        </text>
      ) : null}
      <clipPath id={`clip-${index}`}>
        <rect x={x} y={y} width={width} height={height} />
      </clipPath>
    </g>
  );
};
