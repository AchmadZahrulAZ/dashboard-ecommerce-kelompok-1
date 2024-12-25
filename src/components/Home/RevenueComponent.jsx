import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    sales: 0,
  },
  {
    name: "Feb",
    sales: 0,
  },
  {
    name: "Mar",
    sales: 98000,
  },
  {
    name: "Apr",
    sales: 39080,
  },
  {
    name: "May",
    sales: 48000,
  },
  {
    name: "Jul",
    sales: 28000,
  },
  {
    name: "Aug",
    sales: 33000,
  },
  {
    name: "Sep",
    sales: 41000,
  },
  {
    name: "Oct",
    sales: 0,
  },
  {
    name: "Nov",
    sales: 0,
  },
  {
    name: "Des",
    sales: 0,
  },
];

const RevanueComponent = () => {
  return (
    <div className="card ">
      <div className="px-10 py-9 card-body">
        <div className="flex items-center justify-between px-4">
          <h4 className="mb-3 text-title-large">Revenue 2024</h4>
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-primarycstm w-3 h-3"></div>
            <p className="ml-2 text-primarycstm">Sales</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#DB4444"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevanueComponent;
