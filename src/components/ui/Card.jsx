import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${
        hover ? 'hover:shadow-xl transition-shadow duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
