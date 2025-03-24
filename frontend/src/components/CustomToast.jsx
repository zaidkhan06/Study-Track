// components/CustomToast.jsx
import React from 'react';

const CustomToast = ({ message, type }) => {
  const bgColor = type === 'success' 
    ? 'bg-green-500' 
    : type === 'error' 
    ? 'bg-red-500' 
    : 'bg-blue-500';

  return (
    <div className={`flex items-center ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg`}>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default CustomToast;
