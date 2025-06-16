import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const Button = ({ 
  children,
  label,
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false 
}) => {
  const [clicked, setClicked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const { theme } = useTheme();

  const handleClick = () => {
    if (!disabled) {
      setIsRed(prev => !prev);
      setClicked(true);
      onClick?.();
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      primary: {
        backgroundColor: isRed ? theme.colors.danger[500] : theme.colors.primary[500],
        color: theme.colors.text.primary,
        '&:hover': {
          backgroundColor: isRed ? theme.colors.danger[600] : theme.colors.primary[600],
        },
      },
      secondary: {
        backgroundColor: theme.colors.secondary[100],
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.secondary[300]}`,
        '&:hover': {
          backgroundColor: theme.colors.secondary[200],
          borderColor: theme.colors.secondary[400],
        },
      },
      danger: {
        backgroundColor: theme.colors.danger[500],
        color: theme.colors.text.primary,
        '&:hover': {
          backgroundColor: theme.colors.danger[600],
        },
      },
    };

    return baseStyles[variant] || baseStyles.primary;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: '0.875rem',
          borderRadius: '0.25rem',
        };
      case 'medium':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          fontSize: '1rem',
          borderRadius: '0.375rem',
        };
      case 'large':
        return {
          padding: `${theme.spacing.lg} ${theme.spacing.lg}`,
          fontSize: '1.125rem',
          borderRadius: '0.5rem',
        };
      default:
        return {};
    }
  };

  const buttonText = children || label || 'Button';

  const styles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    fontFamily: 'system-ui, sans-serif',
    fontWeight: 500,
    transition: 'all 0.2s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    '&:hover': !disabled && {
      transform: 'scale(1.05)',
    },
    '&:active': !disabled && {
      transform: 'scale(0.95)',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${theme.colors.primary[500]}`,
    },
  };

  return (
    <button 
      onClick={handleClick}
      disabled={disabled}
      style={styles}
      data-testid="button"
    >
      {buttonText}
    </button>
  );
}; 