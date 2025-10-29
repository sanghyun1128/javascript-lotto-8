import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  pluginJs.configs.recommended,
  ...compat.extends('airbnb-base'),
  prettier,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
      'max-depth': ['error', 2], // depth 2까지만 허용
      'no-ternary': 'error', // 모든 3항 연산자 금지
      // 함수 길이를 최대 15라인으로 제한 (주석/빈라인은 제외)
      'max-lines-per-function': ['error', { max: 15, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    },
  },
];
