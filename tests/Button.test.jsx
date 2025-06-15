import { composeStories } from '@storybook/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as stories from '../src/stories/Button.stories';
import { Button } from '../src/components/Button';

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