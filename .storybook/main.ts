import type { StorybookConfig } from "@storybook/experimental-nextjs-vite";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "msw-storybook-addon",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.mjs"),
    },
  },
  features: {
    experimentalRSC: true,
  },
};
export default config;
