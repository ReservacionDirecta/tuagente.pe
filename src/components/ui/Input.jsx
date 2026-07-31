import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white focus:shadow-md focus:shadow-primary/5 ${
          error ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 hover:border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
