import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/*.md',
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/package.json',
      '**/package-lock.json',
      '**/.editorconfig',
      '**/.prettierignore',
      '**/.prettierrc',
      '**/tsconfig.json',
      '**/tsconfig.*.json',
      '**/vite.config.ts',
      '**/LICENSE',
      '**/.gitignore',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, react },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
