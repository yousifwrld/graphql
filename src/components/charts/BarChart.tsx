"use client";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

// Define the props for the DonutChart component
interface DonutChartProps {
  auditsDone: number;
  auditsReceived: number;
}

const COLORS = ["#ff6601", "#b30201"];

function DonutChartComponent({ auditsDone, auditsReceived }: DonutChartProps) {
  // Define the data for the chart
  const data = [
    { name: "Audits Done", value: auditsDone },
    { name: "Audits Received", value: auditsReceived },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
          label
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={1000}
          stroke="none"
          paddingAngle={5}
        >
          {
            // Map over the data and assign colors to each segment
            data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))
          }
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Customized tooltip for better appearance
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-600 text-white p-2 rounded-lg text-center text-sm">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default DonutChartComponent;
