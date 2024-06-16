import React, { ReactNode } from 'react';

interface CardProps {
  width?: string;
  height?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  shadow?: string;
  hoverEffect?: boolean;
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  width = 'w-64',
  height = 'h-40',
  padding = 'p-4',
  backgroundColor = 'bg-white',
  borderRadius = 'rounded-lg',
  shadow = 'shadow-md',
  hoverEffect = true,
  children,
  className = '',
}) => {
  const cardClasses = `
    ${width} 
    ${height} 
    ${padding} 
    ${backgroundColor} 
    ${borderRadius} 
    ${shadow} 
    ${hoverEffect ? 'hover:shadow-lg hover:-translate-y-1 transform transition' : ''}
    ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
