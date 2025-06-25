"use client"; 

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import initialDashboardConfig from '../data/initialDashboardConfig'; 

const WidgetContext = createContext();

export const useWidgetContext = () => useContext(WidgetContext);

const generateUniqueId = () => `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const WidgetProvider = ({ children }) => {
  const [dashboardConfig, setDashboardConfig] = useState(initialDashboardConfig);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('dashboardConfig');
      if (savedConfig) {
        setDashboardConfig(JSON.parse(savedConfig));
      }
    }
  }, []); 

  useEffect(() => {
    if (typeof window !== 'undefined' && dashboardConfig !== initialDashboardConfig) {
      localStorage.setItem('dashboardConfig', JSON.stringify(dashboardConfig));
    }
  }, [dashboardConfig, initialDashboardConfig]); 

  const addWidget = useCallback((categoryId, widgetName, widgetText) => {
    setDashboardConfig((prevConfig) => {
      const newWidget = {
        id: generateUniqueId(),
        name: widgetName,
        text: widgetText,
        dataType: 'text-only', 
      };

      return prevConfig.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [...category.widgets, newWidget],
            }
          : category
      );
    });
  }, []);

  const removeWidget = useCallback((categoryId, widgetId) => {
    setDashboardConfig((prevConfig) =>
      prevConfig.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId),
            }
          : category
      )
    );
  }, []);

  const toggleWidgetInvolvement = useCallback((categoryId, widgetToToggle, isChecked) => {
    setDashboardConfig((prevConfig) =>
      prevConfig.map((category) => {
        if (category.id === categoryId) {
          if (isChecked) {
            
            if (!category.widgets.some(w => w.id === widgetToToggle.id)) {
              return {
                ...category,
                widgets: [...category.widgets, widgetToToggle],
              };
            }
          } else {
            
            return {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetToToggle.id),
            };
          }
        }
        return category;
      })
    );
  }, []);

  const addCategory = useCallback((categoryName) => {
    setDashboardConfig((prevConfig) => {
      const newCategory = {
        id: generateUniqueId(),
        name: categoryName,
        widgets: [], 
      };
      return [...prevConfig, newCategory];
    });
  }, []);


  return (
    <WidgetContext.Provider value={{ dashboardConfig, addWidget, removeWidget, toggleWidgetInvolvement, initialDashboardConfig, addCategory }}>
      {children}
    </WidgetContext.Provider>
  );
};