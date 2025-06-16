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
  const [isRed, setIsRed] = useState(false);

  // 监听 label 变化，更新 buttonText
  useEffect(() => {
    setButtonText(label);
  }, [label]);

  const handleClick = (e) => {
    if (disabled) return;
    
    // 切换颜色
    setIsRed(prev => !prev);
    
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
        backgroundColor: isRed ? theme.colors.danger[500] : theme.colors.primary[500],
        color: theme.colors.text.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary[100],
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.secondary[300]}`,
      },
      danger: {
        backgroundColor: theme.colors.danger[500],
        color: theme.colors.text.primary,
      },
    };

    return baseStyles[variant] || baseStyles.primary;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '0.375rem 0.75rem',
          fontSize: '0.875rem',
          borderRadius: '0.25rem',
        };
      case 'medium':
        return {
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          borderRadius: '0.375rem',
        };
      case 'large':
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '1.125rem',
          borderRadius: '0.5rem',
        };
      default:
        return {};
    }
  };

  const baseStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    fontFamily: 'system-ui, sans-serif',
    fontWeight: 500,
    transition: 'all 0.2s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transform: clicked ? 'scale(0.95)' : 'scale(1)',
    outline: 'none',
    border: 'none',
  };

  return (
    <button
      data-testid="button"
      style={baseStyles}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {buttonText}
    </button>
  );
}; 