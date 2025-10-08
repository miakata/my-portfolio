﻿import { dirname } from "path";
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
      "node_modules/**",
      ".next/**",
      "dist/**",
      ".sanity/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.d.ts",
    ],
  },

  
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
];

export default eslintConfig;
