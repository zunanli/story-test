import { useState } from "react";

export const Button = ({ 
  children,
  label,
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false 
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setClicked(true);
      onClick?.();
    }
  };

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-gray-800 border border-secondary-300 hover:border-secondary-400',
    danger: 'bg-danger-500 hover:bg-danger-600 text-white shadow-sm hover:shadow-md'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm rounded',
    medium: 'px-4 py-2 text-base rounded-md',
    large: 'px-6 py-3 text-lg rounded-lg'
  };

  const buttonText = children || label || 'Button';

  return (
    <button 
      onClick={handleClick}
      disabled={disabled || clicked}
      className={`
        font-medium transition-all duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${!disabled && !clicked ? 'hover:scale-105 active:scale-95' : ''}
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variant === 'primary' ? 'focus:ring-primary-500' : 
          variant === 'secondary' ? 'focus:ring-secondary-400' : 
          'focus:ring-danger-500'}
      `}
      data-testid="button"
    >
      {clicked ? "Clicked!" : buttonText}
    </button>
  );
}; 