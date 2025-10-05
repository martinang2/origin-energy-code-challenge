import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  staticDirs: ["../public"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["msw-storybook-addon", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};
export default config;
