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
    files: ["*.ts", "*.tsx"], // Apply to TypeScript and TSX files
    rules: {
      // Disable unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",

      // Allow 'any' type
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
