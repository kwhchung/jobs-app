import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "path";

export default defineConfig({
  video: false,
  e2e: {
    testIsolation: false,
    setupNodeEvents: (on, config) => {
      // Define the Webpack configuration
      const webpackOptions = {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'), // Ensure this points to the correct `src` directory
          },
          extensions: ['.js', '.ts', '.tsx'], // Add file extensions to resolve
        },
        module: {
          rules: [
            {
              test: /\.(js|ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env', // Transforms modern JavaScript
                    '@babel/preset-typescript', // Handles TypeScript
                    '@babel/preset-react', // Transforms JSX (if needed)
                  ],
                  plugins: [
                    '@babel/plugin-syntax-jsx', // Enables JSX parsing (if needed)
                  ],
                },
              },
            },
          ],
        },
      };

      // Pass the Webpack options to the preprocessor
      on(
        'file:preprocessor',
        webpackPreprocessor({ webpackOptions })
      );

      // Return the config object
      return config;
    },
  },
});