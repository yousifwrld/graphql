"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// Define the props for the RadarChart component
interface RadarChartProps {
  data: { name: string; amount: number }[];
}

function RadarChartComponent({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <Radar
          name="Amount"
          dataKey="amount"
          stroke="#ff6601"
          fill="#ff6601"
          fillOpacity={0.7}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default RadarChartComponent;
