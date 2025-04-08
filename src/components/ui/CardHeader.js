// src/components/ui/CardHeader.js
import React from 'react';

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-4 py-2 bg-gray-100 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
