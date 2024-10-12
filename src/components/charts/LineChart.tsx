"use client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

interface LineChartProps {
  xpData: { name: string; xp: number }[];
}
function LineChartComponent({ xpData }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={400} height={300} data={xpData}>
        <XAxis dataKey="name" tick={{ fill: "white", fontSize: "12" }} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          dataKey="xp"
          stroke="#ffffff"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;

// customized tooltip for better appearance
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-600 text-white p-2 rounded-lg text-center text-sm">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
