module.exports = {
  plugins: ["@stylistic/stylelint-plugin"],
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', '@stylistic/stylelint-config'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    "@stylistic/color-hex-case": "lower",
    '@stylistic/string-quotes': 'single',
    '@stylistic/declaration-colon-newline-after': null,
    '@stylistic/indentation': null,
    '@stylistic/value-list-comma-newline-after': null
  },
  defaultSeverity: 'error',
  customSyntax: 'postcss-html',
}
