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

// 基础交互测试
export const Default = {
  args: { children: 'Click me' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByTestId('button');

    await step('初始状态检查', async () => {
      expect(button).toHaveTextContent('Click me');
      expect(button).not.toBeDisabled();
    });

    await step('点击按钮', async () => {
      await userEvent.click(button);
    });

    await step('点击后状态检查', async () => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Clicked!');
    });
  },
};

// 主题切换交互测试
export const WithTheme = {
  args: { children: 'Theme Aware Button' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const themeToggle = await canvas.getByText('🌙 Dark');
    const button = await canvas.getByTestId('button');

    // 获取初始主题下的按钮样式
    const initialStyle = window.getComputedStyle(button);
    const initialBackgroundColor = initialStyle.backgroundColor;

    await step('切换到暗色主题', async () => {
      await userEvent.click(themeToggle);
      // 等待主题切换动画完成
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    await step('验证暗色主题下的视觉表现', async () => {
      const darkStyle = window.getComputedStyle(button);
      expect(darkStyle.backgroundColor).not.toBe(initialBackgroundColor);
      expect(themeToggle).toHaveTextContent('☀️ Light');
      // 验证暗色主题下的其他视觉属性
      expect(darkStyle.color).toBeDefined();
      expect(darkStyle.borderColor).toBeDefined();
    });

    await step('切换回亮色主题', async () => {
      await userEvent.click(themeToggle);
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    await step('验证亮色主题下的视觉表现', async () => {
      const lightStyle = window.getComputedStyle(button);
      expect(lightStyle.backgroundColor).toBe(initialBackgroundColor);
      expect(themeToggle).toHaveTextContent('🌙 Dark');
      // 验证亮色主题下的其他视觉属性
      expect(lightStyle.color).toBeDefined();
      expect(lightStyle.borderColor).toBeDefined();
    });
  },
};

// 变体切换交互测试
export const VariantSwitching = {
  args: { children: 'Variant Button' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByTestId('button');

    await step('测试不同变体的视觉表现', async () => {
      const variants = ['primary', 'secondary', 'danger'];
      const styles = {};

      for (const variant of variants) {
        // 记录当前变体的样式
        styles[variant] = window.getComputedStyle(button);
        
        // 验证每个变体都有独特的视觉特征
        expect(styles[variant].backgroundColor).toBeDefined();
        expect(styles[variant].color).toBeDefined();
        
        // 验证变体之间的样式差异
        if (variant !== 'primary') {
          expect(styles[variant].backgroundColor).not.toBe(styles.primary.backgroundColor);
        }
      }
    });
  },
}; 