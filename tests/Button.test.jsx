import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/Button';
import { ThemeProvider } from '../src/context/ThemeContext';

// 创建一个包装器组件来提供主题上下文
const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders with correct label', () => {
    renderWithTheme(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
}); 