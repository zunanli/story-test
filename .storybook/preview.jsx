import '../src/index.css';
import { ThemeProvider } from '../src/context/ThemeContext';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    interactions: {
      // 启用交互测试
      enable: true,
      // 设置交互测试的超时时间
      timeout: 5000,
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', backgroundColor: 'var(--background-color)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview; 