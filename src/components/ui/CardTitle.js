// src/components/ui/CardTitle.js
import React from 'react';

const CardTitle = ({ children, className = '', size = 'medium', ...props }) => {
  const sizeStyles = {
    small: 'text-base font-medium',
    medium: 'text-lg font-semibold',
    large: 'text-xl font-bold'
  };

  return (
    <h2 className={`text-gray-800 tracking-tight ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default CardTitle;
