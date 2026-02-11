import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
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
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
]);
