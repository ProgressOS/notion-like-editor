import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@progressos/notion-like-editor": path.resolve(__dirname, "../src"),
          "@/": path.resolve(__dirname, "../src/components/"),
        },
      },
      plugins: [tsconfigPaths()],
    }),
};
export default config;
