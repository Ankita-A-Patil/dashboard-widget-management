
"use client"; 

import React, { useState } from 'react';
import { useWidgetContext } from '../context/WidgetContext';
import WidgetCard from '../components/WidgetCard';
import AddWidgetModal from '../components/AddWidgetModal';
import AddCategoryModal from '../components/AddCategoryModal';

const Home = () => {
  const { dashboardConfig } = useWidgetContext();
  const [showAddWidgetModal, setShowAddWidgetModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [preselectedCategoryForModal, setPreselectedCategoryForModal] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const filteredDashboardConfig = dashboardConfig.map(category => {
 
    if (!globalSearchTerm.trim()) {
      return category;
    }
    const filteredWidgets = category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
      (widget.text && widget.text.toLowerCase().includes(globalSearchTerm.toLowerCase())) 
    );
    return { ...category, widgets: filteredWidgets };
  }).filter(category => category.widgets.length > 0 || !globalSearchTerm.trim());

  const openAddWidgetModal = (categoryId = null) => {
    setPreselectedCategoryForModal(categoryId);
    setShowAddWidgetModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-500">/</span>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard V2</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search anything..."
            className="hidden md:block px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={globalSearchTerm}
            onChange={(e) => setGlobalSearchTerm(e.target.value)}
          />
          
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Category
          </button>
          
          <button
            onClick={() => openAddWidgetModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Widget
          </button>
         
          <button className="p-2 rounded-md hover:bg-gray-200 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Last 2 days
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-semibold text-sm">
              JD
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      <main className="p-6">
        {filteredDashboardConfig.map((category) => (
          <section key={category.id} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
              
              <div className="flex items-center space-x-2">
                 <button className="p-2 rounded-md hover:bg-gray-200 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.widgets.length > 0 ? (
                category.widgets.map((widget) => (
                  <WidgetCard key={widget.id} categoryId={category.id} widget={widget} />
                ))
              ) : null}

              <div
                className="bg-white rounded-xl shadow-md p-4 m-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer min-h-[150px]"
                onClick={() => openAddWidgetModal(category.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Widget</span>
              </div>
            </div>
          </section>
        ))}
        {filteredDashboardConfig.length === 0 && globalSearchTerm.trim() && (
          <p className="text-gray-600 text-center text-xl mt-10">No categories or widgets found matching your search term: "{globalSearchTerm}"</p>
        )}
      </main>

      {showAddWidgetModal && (
        <AddWidgetModal
          onClose={() => setShowAddWidgetModal(false)}
          preSelectedCategoryId={preselectedCategoryForModal}
        />
      )}

      {showAddCategoryModal && (
        <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} />
      )}
    </div>
  );
};

export default Home;


