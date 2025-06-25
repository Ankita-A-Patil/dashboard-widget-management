
import React from 'react';

const ChartLegend = ({ data, colors }) => (
  <div className="flex flex-col justify-center space-y-1 ml-4 text-sm">
    {data.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center">
        <span
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: colors[index % colors.length] }}
        ></span>
        <span className="text-gray-700">{`${entry.name} (${entry.value})`}</span>
      </div>
    ))}
  </div>
);

export default ChartLegend;
