// src/components/ui/CardHeader.js
import React from 'react';

const CardHeader = ({ children, className = '', variant = 'default', ...props }) => {
  const variantStyles = {
    default: 'px-5 py-4 bg-gray-50 border-b border-gray-100',
    colored: 'px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100',
    transparent: 'px-5 py-4',
    compact: 'px-4 py-3 bg-gray-50 border-b border-gray-100'
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
