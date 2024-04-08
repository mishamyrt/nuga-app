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
    "@stylistic/color-hex-case": "upper",
    '@stylistic/string-quotes': 'single',
  },
  defaultSeverity: 'error',
  customSyntax: 'postcss-html',
}
