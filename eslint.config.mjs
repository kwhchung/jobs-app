import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/*",
      "src/components/ui/*",
      "src/stories/*",
    ],
  },
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/features/(?!([^/]+)/\\1/).*",],
        }
      ],
      "import/no-cycle": "error",
      // "react/display-name": "off",
      // "@typescript-eslint/no-explicit-any": "off",
    }
  }
];

export default eslintConfig;
