import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const DashboardPieChart = () => {
  const PIECOLOR = ["#5C48F6", "#EDEDED"];

  const pieData = [
    { name: "Progress", value: 30 },
    { name: "Remaining", value: 100 - 30 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={120} height={120}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={50}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIECOLOR[index]} />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight="bold"
          fill="#333"
        >
          {`${30}%`}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
