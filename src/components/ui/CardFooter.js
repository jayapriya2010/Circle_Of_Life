import React from 'react';

const CardFooter = ({ children, className = '', variant = 'default', ...props }) => {
  const variantStyles = {
    default: 'px-5 py-4 border-t border-gray-100 bg-gray-50',
    transparent: 'px-5 py-4',
    colored: 'px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100',
    compact: 'px-4 py-3 border-t border-gray-100'
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardFooter;