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
};

export default preview; 