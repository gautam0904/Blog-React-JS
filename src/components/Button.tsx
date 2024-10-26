import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  type?: string;
  bgColor?: string;
  textColor?: string;
  className ?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'white',
  className = '',
  ...props
}) => {
  return (
    <button
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `} {...props}
    >{children}</button>
  );
}

export default Button