import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 基础渲染测试
  it('renders with correct label', () => {
    renderWithTheme(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  // 状态管理测试
  describe('State Management', () => {
    it('updates buttonText when label prop changes', () => {
      const { rerender } = renderWithTheme(<Button label="Initial" />);
      expect(screen.getByText('Initial')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider>
          <Button label="Updated" />
        </ThemeProvider>
      );
      expect(screen.getByText('Updated')).toBeInTheDocument();
    });

    it('toggles isRed state on click', () => {
      renderWithTheme(<Button label="Color Toggle" />);
      const button = screen.getByText('Color Toggle');
      
      // 初始状态应该是蓝色
      expect(button.style.backgroundColor).toBe('rgb(59, 130, 246)');
      
      // 点击后变为红色
      fireEvent.click(button);
      expect(button.style.backgroundColor).toBe('rgb(239, 68, 68)');
      
      // 再次点击变回蓝色
      fireEvent.click(button);
      expect(button.style.backgroundColor).toBe('rgb(59, 130, 246)');
    });

    it('manages clicked state with timeout', async () => {
      vi.useFakeTimers();
      renderWithTheme(<Button label="Animated" />);
      const button = screen.getByText('Animated');
      
      // 初始状态
      expect(button.style.transform).toBe('scale(1)');
      
      // 点击后立即改变
      fireEvent.click(button);
      expect(button.style.transform).toBe('scale(0.95)');
      
      // 200ms 后恢复
      await act(async () => {
        vi.advanceTimersByTime(200);
      });
      expect(button.style.transform).toBe('scale(1)');
      
      vi.useRealTimers();
    });
  });

  // 事件处理测试
  describe('Event Handling', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button label="Click Me" onClick={handleClick} />);
      
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button label="Disabled" disabled onClick={handleClick} />);
      
      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows alert with current buttonText when showAlert is true', () => {
      const alertSpy = vi.spyOn(window, 'alert');
      renderWithTheme(<Button label="Alert Button" showAlert />);
      
      fireEvent.click(screen.getByText('Alert Button'));
      expect(alertSpy).toHaveBeenCalledWith('Alert Button');
    });
  });

  // Props 验证测试
  describe('Props Validation', () => {
    it('applies correct variant styles', () => {
      const { rerender } = renderWithTheme(<Button label="Primary" variant="primary" />);
      let button = screen.getByText('Primary');
      expect(button.style.backgroundColor).toBe('rgb(59, 130, 246)');
      
      rerender(
        <ThemeProvider>
          <Button label="Danger" variant="danger" />
        </ThemeProvider>
      );
      button = screen.getByText('Danger');
      expect(button.style.backgroundColor).toBe('rgb(239, 68, 68)');
    });

    it('applies correct size styles', () => {
      renderWithTheme(<Button label="Small" size="small" />);
      const button = screen.getByText('Small');
      expect(button.style.padding).toBe('0.375rem 0.75rem');
      expect(button.style.fontSize).toBe('0.875rem');
    });

    it('applies disabled styles', () => {
      renderWithTheme(<Button label="Disabled" disabled />);
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
      expect(button.style.opacity).toBe('0.5');
      expect(button.style.cursor).toBe('not-allowed');
    });
  });
}); 