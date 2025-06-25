"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WidgetContext = createContext();
const initialDashboardConfig = [
  {
    id: 'cspm-executive',
    name: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        text: 'Connected (2), Not Connected (2)', 
        dataType: 'pie',
        chartData: [
          { name: 'Connected', value: 2 },
          { name: 'Not Connected', value: 2 },
        ],
        colors: ['#4299E1', '#CBD5E0'], 
        totalLabel: 'Total', 
      },
      {
        id: 'cloud-account-risk-assessment',
        name: 'Cloud Account Risk Assessment',
        text: 'Failed (1689), Warning (881), Not available (36), Passed (7253)', 
        dataType: 'pie',
        chartData: [
          { name: 'Failed', value: 1689 },
          { name: 'Warning', value: 881 },
          { name: 'Not available', value: 36 },
          { name: 'Passed', value: 7253 },
        ],
        colors: ['#EF4444', '#F59E0B', '#9CA3AF', '#10B981'], 
        totalLabel: 'Total',
    }
],
  },
  {
    id: 'cwpp-dashboard',
    name: 'CWPP Dashboard:',
    widgets: [
      { id: 'top-5-namespace-specific-alerts', name: 'Top 5 Namespace Specific Alerts', text: 'No Graph data available!', dataType: 'text-only' },
      { id: 'workload-alerts', name: 'Workload Alerts', text: 'No Graph data available!', dataType: 'text-only' },
    ],
  },
  {
    id: 'registry-scan',
    name: 'Registry Scan',
    widgets: [
      {
        id: 'image-risk-assessment',
        name: 'Image Risk Assessment',
        text: '1470 Total Vulnerabilities', 
        dataType: 'bar',
        chartData: [
          { name: 'Critical', value: 9 },
          { name: 'High', value: 150 },
          { name: 'Medium', value: 500 },
          { name: 'Low', value: 811 },
        ],
        colors: ['#DC2626', '#F59E0B', '#3B82F6', '#10B981'], 
      },
      {
        id: 'image-security-issues',
        name: 'Image Security Issues',
        text: '2 Total Images', 
        dataType: 'bar',
        chartData: [
          { name: 'Critical', value: 2 },
          { name: 'High', value: 2 },
          { name: 'Medium', value: 1 },
          { name: 'Low', value: 0 },
        ],
        colors: ['#DC2626', '#F59E0B', '#3B82F6', '#10B981'],
      },
    ],
  },
];

export default initialDashboardConfig;