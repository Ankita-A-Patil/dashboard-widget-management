'use client';

import React, { useState, useContext } from 'react';
import { useWidgetContext } from '@/context/WidgetContext';

const AddWidgetModal = ({ onClose, preSelectedCategoryId }) => {
  const { addWidget, dashboardConfig, toggleWidgetInvolvement, initialDashboardConfig } = useWidgetContext();
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('New Widget');
  const [selectedCategoryId, setSelectedCategoryId] = useState(preSelectedCategoryId || dashboardConfig[0]?.id || '');
  const allCategories = dashboardConfig.map(cat => ({ id: cat.id, name: cat.name }));
  const allAvailableWidgetsMaster = initialDashboardConfig.flatMap(cat => cat.widgets);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newWidgetName.trim() && newWidgetText.trim() && selectedCategoryId) {
      addWidget(selectedCategoryId, newWidgetName, newWidgetText);
      setNewWidgetName('');
      setNewWidgetText('');
      onClose();
    }
  };

  const filteredAvailableWidgets = allAvailableWidgetsMaster.filter(widget => {
    const isMatchingSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (preSelectedCategoryId) {
      const targetCategoryWidgets = dashboardConfig.find(cat => cat.id === preSelectedCategoryId)?.widgets || [];
      const isAlreadyInSelectedCategory = targetCategoryWidgets.some(existingWidget => existingWidget.id === widget.id);
      return isMatchingSearch && !isAlreadyInSelectedCategory;
    } else {
      return isMatchingSearch;
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Add Widget</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!preSelectedCategoryId && (
          <div className="p-4 border-b">
            <label htmlFor="selectCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              id="selectCategory"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {allCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex border-b">
          <button
            className={`py-3 px-6 text-sm font-medium ${
              activeTab === 'New Widget' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('New Widget')}
          >
            Add New Widget
          </button>
          <button
            className={`py-3 px-6 text-sm font-medium ${
              activeTab === 'Existing Widgets' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('Existing Widgets')}
          >
            Existing Widgets
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'New Widget' ? (
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label htmlFor="newWidgetName" className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Name
                </label>
                <input
                  type="text"
                  id="newWidgetName"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., New Metric Chart"
                  required
                />
              </div>
              <div>
                <label htmlFor="newWidgetText" className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Text
                </label>
                <textarea
                  id="newWidgetText"
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., This widget displays important data."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Widget
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search existing widgets..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredAvailableWidgets.length > 0 ? (
                  filteredAvailableWidgets.map((widget) => (
                    <div key={widget.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            dashboardConfig
                              .find(cat => cat.id === selectedCategoryId)
                              ?.widgets.some(w => w.id === widget.id) || false
                          }
                          onChange={(e) => toggleWidgetInvolvement(selectedCategoryId, widget, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-gray-800">{widget.name}</span>
                      </label>
                      <span className="text-gray-500 text-sm">{widget.text.substring(0, 50)}...</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No widgets found matching your search or already in this category.</p>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddWidgetModal;