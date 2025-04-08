// src/components/ui/CardTitle.js
import React from 'react';

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`} {...props}>
      {children}
    </h2>
  );
};

export default CardTitle;
