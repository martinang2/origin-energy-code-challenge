import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  staticDirs: ["../public"],
  stories: [
    {
      directory: "../src/components",
      files: "**/*.stories.@(js|jsx|ts|tsx|mdx)",
      titlePrefix: "Components",
    },
    {
      directory: "../src/app",
      files: "**/*.stories.@(js|jsx|ts|tsx|mdx)",
      titlePrefix: "App",
    },
  ],
  addons: ["msw-storybook-addon", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};
export default config;
