const { FS_LAYERS } = require('./eslint/utils.cjs')
const path = require('path')

const DENIED_PATH_GROUPS = [
  // Private imports are prohibited, use public imports instead
  '$app/**',
  '$pages/*/**',
  '$widgets/*/**',
  '$features/*/**',
  '$entities/*/(?!@x)/**',
  '$entities/*/!(@x)',
  '$shared/*/*/**',
  ...FS_LAYERS.map((layer) => `../**/${layer}`),
]

module.exports = {
  plugins: ['eslint-plugin-simple-import-sort', 'effector', 'import'],
  extends: [
    'plugin:svelte/recommended',
    'plugin:import/typescript',
    'love',
    'plugin:effector/recommended',
    'plugin:effector/patronum',
    path.resolve(__dirname, './eslint/layers-slices.cjs'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    extraFileExtensions: ['.svelte'],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    {
      files: ['**/__tests__/*.ts'],
      rules: {
        'effector/no-getState': 'off',
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-template-curly-in-string': 'off',
      },
    },
  ],
  rules: {
    'svelte/valid-compile': [
      'error',
      {
        ignoreWarnings: true,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/return-await': 'off',
    'no-undef-init': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/naming-convention': 'error',
    'no-restricted-imports': ["error", { "patterns": DENIED_PATH_GROUPS }],
    'effector/enforce-store-naming-convention': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
  },
}
