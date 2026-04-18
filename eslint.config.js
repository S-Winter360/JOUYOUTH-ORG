import js from "@eslint/js";
import tseslint from "typescript-eslint";
import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
    },
  },
  firebaseRulesPlugin.configs['flat/recommended']
];
