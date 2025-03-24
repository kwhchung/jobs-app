import { defineConfig, defaultConfig, createSystem } from "@chakra-ui/react";

const styles = {
  height: "100%",
  bg: "gray.50",
};

const colors = {
  primary: {
    value: "#1a365d",
  },
  primaryAccent: {
    value: "#ffffff",
  }
};

const customConfig = defineConfig({
  globalCss: {
    "html, body": styles,
    "#__next": styles,
  },
  theme: {
    semanticTokens: {
      colors: colors,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);