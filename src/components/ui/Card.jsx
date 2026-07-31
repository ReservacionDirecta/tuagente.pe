import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden ${
        hover ? 'transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:ring-gray-200/50' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
