"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Label, Text } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
        <p className="font-semibold text-gray-900">{data.name}</p>
        <p className="text-gray-700">{`Value: ${data.value}`}</p>
      </div>
    );
  }
  return null;
};

const GraphRenderer = ({ type, data, colors, totalLabel }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center text-sm py-4">No Graph data available!</p>;
  }

  const chartDimension = 90; 
  const pieInnerRadius = chartDimension * 0.3;
  const pieOuterRadius = chartDimension * 0.4;

  if (type === 'pie') {
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <ResponsiveContainer width={chartDimension} height={chartDimension}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={pieInnerRadius}
            outerRadius={pieOuterRadius}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            <Label
              value={`${totalValue}\n${totalLabel || ''}`}
              position="center"
              fill="#333"
              fontSize="12" 
              fontWeight="bold"
              style={{
                whiteSpace: 'pre-line',
                textAnchor: 'middle',
                dominantBaseline: 'central'
              }}
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  } else if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={chartDimension}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <YAxis dataKey="name" type="category" hide />
          <XAxis type="number" hide />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" barSize={10} radius={[5, 5, 5, 5]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return null;
};


export default GraphRenderer;