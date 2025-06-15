import { within, userEvent, expect } from '@storybook/test';
import { Button } from '../components/Button';

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