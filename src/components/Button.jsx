import { useState } from "react";

export const Button = ({ 
  children, 
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
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      onClick={handleClick}
      disabled={disabled || clicked}
      className={`
        rounded-md font-medium transition-colors
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      data-testid="button"
    >
      {clicked ? "Clicked!" : children}
    </button>
  );
}; 