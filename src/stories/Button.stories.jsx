import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { expect } from '@storybook/test';
import { userEvent } from '@storybook/testing-library';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '-100%',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        backgroundColor: mode === 'light' ? '#1F2937' : '#F3F4F6',
        color: mode === 'light' ? '#F9FAFB' : '#1F2937',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </div>
  );
};

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: '200px' }}>
        <ThemeToggle />
        <Story />
      </div>
    ),
  ],
};

export const Interactive = {
  args: {
    label: 'Toggle Color',
    variant: 'primary',
    size: 'medium',
  },
  play: async ({ canvasElement, step }) => {
    const button = canvasElement.querySelector('[data-testid="button"]');
    
    await step('Initial state - blue color', async () => {
      // Verify initial color is blue (primary)
      expect(button.style.backgroundColor).toBe('rgb(59, 130, 246)'); // #3B82F6
    });

    await step('First click - changes to red', async () => {
      // Use userEvent for more reliable click simulation
      await userEvent.click(button);
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 0));
      // Verify color changed to red
      expect(button.style.backgroundColor).toBe('rgb(239, 68, 68)'); // #EF4444
    });

    await step('Second click - changes back to blue', async () => {
      // Use userEvent for more reliable click simulation
      await userEvent.click(button);
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 0));
      // Verify color changed back to blue
      expect(button.style.backgroundColor).toBe('rgb(59, 130, 246)'); // #3B82F6
    });
  },
}; 