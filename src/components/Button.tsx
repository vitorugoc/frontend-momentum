import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  rounded?: boolean;
  outline?: boolean;
  hoverEffect?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor = 'bg-blue-500',
  textColor = 'text-white',
  size = 'medium',
  fullWidth = false,
  rounded = true,
  outline = false,
  hoverEffect = true,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = `
    ${backgroundColor} 
    ${textColor} 
    ${size === 'small' ? 'py-1 px-3 text-sm' : size === 'large' ? 'py-3 px-6 text-lg' : 'py-2 px-4 text-base'} 
    ${fullWidth ? 'w-full' : ''} 
    ${rounded ? 'rounded-md' : 'rounded-none'} 
    ${outline ? 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white' : ''}
    ${hoverEffect ? 'hover:bg-opacity-75 transition' : ''}
    ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
