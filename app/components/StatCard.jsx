import React from 'react';

// Simple StatCard component
const StatCard = ({ name, icon: Icon, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{name}</p>
        <p className="text-2xl font-bold text-[#D32F2F]">{value}</p>
      </div>
      <div className="bg-red-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-[#D32F2F]" />
      </div>
    </div>
  </div>
);


export default StatCard;
