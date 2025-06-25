"use client";

import React from 'react';
import { useWidgetContext } from '@/context/WidgetContext'; 
import GraphRenderer from './GraphRenderer'; 
import ChartLegend from './ChartLegend'; 

const WidgetCard = ({ categoryId, widget }) => {
const { removeWidget } = useWidgetContext();

  const renderWidgetContent = () => {
    if (widget.dataType === 'pie' || widget.dataType === 'bar') {
      return (
        
        <div className="flex flex-col h-full">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{widget.name}</h3>
          <div className="flex flex-grow items-center justify-center">
            
            <div className="flex-shrink-0">
              <GraphRenderer type={widget.dataType} data={widget.chartData} colors={widget.colors} totalLabel={widget.totalLabel} />
            </div>
            
            <div className="flex-grow">
              <ChartLegend data={widget.chartData} colors={widget.colors} />
            </div>
          </div>
          
        </div>
      );
    } else {
      return (
        <>
          <h3 className="font-semibold text-lg text-gray-800">{widget.name}</h3>
          
          <p className="text-gray-600 text-sm mt-2 flex-grow">{widget.text}</p>
        </>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 m-2 relative min-h-[150px] flex flex-col justify-between">
      <div className="absolute top-3 right-3">
        <button
          onClick={() => removeWidget(categoryId, widget.id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
          aria-label={`Remove ${widget.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {renderWidgetContent()}
    </div>
  );
};

export default WidgetCard;
