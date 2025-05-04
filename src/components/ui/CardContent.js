// src/components/ui/CardContent.js
import React from 'react';

const CardContent = ({ children, className = '', padding = 'normal', ...props }) => {
  const paddingStyles = {
    none: '',
    small: 'p-3',
    normal: 'p-5',
    large: 'p-6'
  };

  return (
    <div className={`${paddingStyles[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardContent;
