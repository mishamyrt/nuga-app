const { FS_LAYERS } = require('./eslint/utils.cjs')
const { resolve } = require('path')

/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
  // Private imports are prohibited, use public imports instead
  'app/**',
  'pages/*/**',
  'widgets/*/**',
  'features/*/**',
  'entities/*/(?!@x)/**',
  'entities/*/!(@x)',
  'shared/*/*/**', // Для shared +1 уровень, т.к. там чаще мы обращаемся к конкретной библиотеке/компоненты
  // Prefer absolute imports instead of relatives (for root modules)
  ...FS_LAYERS.map((layer) => `../**/${layer}`)
]

module.exports = {
  extends: [
    'love',
    'plugin:svelte/recommended',
    resolve(__dirname, './eslint/layers-slices.cjs'),
  ],
  plugins: [
    'eslint-plugin-simple-import-sort'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    extraFileExtensions: ['.svelte']
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    'svelte/valid-compile': [
      'error',
      {
        ignoreWarnings: true
      }
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
    'import/no-internal-modules': [
      'error',
      {
        forbid: DENIED_PATH_GROUPS,
      },
    ],
  }
}
