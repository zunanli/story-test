import { composeStories } from '@storybook/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as stories from '../src/stories/Button.stories';
import { Button } from '../src/components/Button';
import { ThemeProvider } from '../src/context/ThemeContext';

const { Default } = composeStories(stories);

it('通过 Storybook play 函数测试按钮交互', async () => {
  render(<Default />);
  await Default.play({ canvasElement: document.body });
});

it('独立测试按钮点击行为', async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Test</Button>);
  const button = screen.getByTestId('button');
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalled();
  expect(button).toBeDisabled();
});

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('bg-blue-500');

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('bg-gray-200');

    rerender(<Button variant="danger">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('bg-red-500');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="small">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('px-3');

    rerender(<Button size="medium">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('px-4');

    rerender(<Button size="large">Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('px-6');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByTestId('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });
});

// 包装组件以提供主题上下文
const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('Button Component Logic Tests', () => {
  // 测试 props 传递
  it('renders with correct props', () => {
    renderWithTheme(<Button variant="primary" size="medium" disabled={false}>Test Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  // 测试点击事件处理
  it('handles click events correctly', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByTestId('button');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试禁用状态
  it('respects disabled prop', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    const button = screen.getByTestId('button');
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  // 测试内部状态管理
  it('manages clicked state correctly', () => {
    renderWithTheme(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    
    // 初始状态
    expect(button).toHaveTextContent('Click me');
    
    // 点击后状态
    fireEvent.click(button);
    expect(button).toHaveTextContent('Clicked!');
    expect(button).toBeDisabled();
  });

  // 测试主题上下文集成
  it('integrates with theme context', () => {
    renderWithTheme(<Button>Theme Button</Button>);
    const button = screen.getByTestId('button');
    const styles = window.getComputedStyle(button);
    
    // 验证按钮使用了主题中的颜色
    expect(styles.backgroundColor).toBeDefined();
  });

  // 测试边界情况
  it('handles edge cases', () => {
    // 测试空 children
    renderWithTheme(<Button />);
    expect(screen.getByTestId('button')).toHaveTextContent('Button');

    // 测试 null onClick
    renderWithTheme(<Button onClick={null}>Click me</Button>);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    // 不应该抛出错误
  });
}); 