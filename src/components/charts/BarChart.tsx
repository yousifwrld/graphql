"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

// Define the props for the BarChart component
interface BarChartProps {
  auditsDone: number;
  auditsReceived: number;
}

function BarChartComponent({ auditsDone, auditsReceived }: BarChartProps) {
  // Define the data for the chart
  const data = [
    { name: "Audits Done", auditsDone: auditsDone },
    { name: "Audits Received", auditsReceived: auditsReceived },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{ top: 20, right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="name" tick={{ fill: "white", fontSize: "12" }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="auditsDone"
          fill="#ffffff"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1000}
        />
        <Bar
          dataKey="auditsReceived"
          fill="#4bc6b8"
          isAnimationActive={true}
          animationBegin={500}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

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

export default BarChartComponent;
