import dayjs from "dayjs";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const DashboardAreaChart = () => {
  const AREADATA = [
    { date: "2024-02-01", uv: 4000, pv: 2400, amt: 2400 },
    { date: "2024-02-05", uv: 3000, pv: 1398, amt: 2210 },
    { date: "2024-02-10", uv: 2000, pv: 9800, amt: 2290 },
    { date: "2024-02-15", uv: 2780, pv: 3908, amt: 2000 },
    { date: "2024-02-20", uv: 1890, pv: 4800, amt: 2181 },
    { date: "2024-02-25", uv: 2390, pv: 3800, amt: 2500 },
    { date: "2024-02-28", uv: 3490, pv: 4300, amt: 2100 },
  ];
  const formatDate = (tick) => dayjs(tick).format("MMM D");

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={280}
        data={AREADATA}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15.16%" stopColor="#5C48F6" stopOpacity={1} />
            <stop offset="100%" stopColor="#5C48F6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis ticks={[5000, 3000, 2000, 1000]} />
        <Area
          type="linear"
          dataKey="uv"
          stroke="#8884d8"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardAreaChart;
