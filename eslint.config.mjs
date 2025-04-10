import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next",
      "next/typescript",
      "next/core-web-vitals",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/jsx-runtime",
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/prop-types": "warn",
      "react/no-unknown-property": "warn",
      "no-empty-pattern": "warn",
      "no-constant-condition": "warn",
    },
    plugins: ["react", "react-hooks"],
  }),
];

export default eslintConfig;
