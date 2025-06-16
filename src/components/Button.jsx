import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Button = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  showAlert = false,
  alertMessage,
  onClick,
  ...props
}) => {
  const [clicked, setClicked] = useState(false);
  const { theme } = useTheme();
  const [buttonText, setButtonText] = useState(label);

  // 监听 label 变化，更新 buttonText
  useEffect(() => {
    setButtonText(label);
  }, [label]);

  const handleClick = (e) => {
    if (disabled) return;
    
    // 更新点击状态
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    // 如果设置了 showAlert，显示当前的 buttonText
    if (showAlert) {
      window.alert(buttonText);
    }

    // 调用外部传入的 onClick
    onClick?.(e);
  };

  const getVariantStyles = () => {
    const baseStyles = {
      primary: {
        backgroundColor: theme.colors.primary[500],
        color: theme.colors.text.primary,
        '&:hover': {
          backgroundColor: theme.colors.primary[600],
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
      data-testid="button"
      style={styles}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {buttonText}
    </button>
  );
}; 