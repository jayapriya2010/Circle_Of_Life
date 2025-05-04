// src/components/ui/Card.js
import React from 'react';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-white shadow-md hover:shadow-lg',
    outline: 'bg-white border border-gray-200 hover:border-gray-300',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    glass: 'bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg border border-white/20'
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
