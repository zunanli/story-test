import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themeTokens = {
  light: {
    colors: {
      primary: {
        500: '#3B82F6',
        600: '#2563EB',
      },
      secondary: {
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
      },
      danger: {
        500: '#EF4444',
        600: '#DC2626',
      },
      text: {
        primary: '#1F2937',
        secondary: '#4B5563',
      },
      background: '#FFFFFF',
    },
    spacing: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
    },
  },
  dark: {
    colors: {
      primary: {
        500: '#60A5FA',
        600: '#3B82F6',
      },
      secondary: {
        100: '#374151',
        200: '#4B5563',
        300: '#6B7280',
        400: '#9CA3AF',
      },
      danger: {
        500: '#F87171',
        600: '#EF4444',
      },
      text: {
        primary: '#F9FAFB',
        secondary: '#E5E7EB',
      },
      background: '#111827',
    },
    spacing: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
    },
  },
};

export const ThemeProvider = ({ children, initialMode = 'light' }) => {
  const [mode, setMode] = useState(initialMode);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = themeTokens[mode];

  const contextValue = {
    mode,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 