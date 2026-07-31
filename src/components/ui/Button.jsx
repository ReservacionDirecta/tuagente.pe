import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out cursor-pointer active:scale-[0.97]';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5',
    secondary: 'bg-secondary text-gray-900 hover:bg-secondary-dark shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
