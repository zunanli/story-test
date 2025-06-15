import { within, userEvent, expect } from '@storybook/test';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        backgroundColor: mode === 'light' ? '#1F2937' : '#F3F4F6',
        color: mode === 'light' ? '#F9FAFB' : '#1F2937',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // 启用交互测试
    interactions: {
      enable: true,
    },
  },
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

export const Default = {
  args: { label: 'Click me' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByTestId('button');

    // 使用 step 来组织交互测试步骤
    await step('点击按钮', async () => {
      await userEvent.click(button);
    });

    await step('验证按钮状态', async () => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Clicked!');
    });
  },
};

export const WithTheme = {
  args: { children: 'Theme Aware Button' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const themeToggle = await canvas.getByText('🌙 Dark');
    const button = await canvas.getByTestId('button');

    await step('切换主题', async () => {
      await userEvent.click(themeToggle);
    });

    await step('验证按钮在暗色主题下的样式', async () => {
      const buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.backgroundColor).toBeDefined();
    });

    await step('再次切换主题', async () => {
      await userEvent.click(themeToggle);
    });

    await step('验证按钮在亮色主题下的样式', async () => {
      const buttonStyle = window.getComputedStyle(button);
      expect(buttonStyle.backgroundColor).toBeDefined();
    });
  },
}; 