import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'
import prettier from 'eslint-plugin-prettier'

const nextRules = Object.keys(next.configs.recommended.rules).reduce(
  (acc, rule) => ({
    ...acc,
    [rule.replace('@next/', '')]: next.configs.recommended.rules[rule]
  }),
  {}
)

export default tseslint.config({
  files: ['**/*.{ts,tsx,mjs}'],
  ignores: ['.next/**/*', 'coverage/**/*'],
  plugins: {
    next,
    prettier
  },
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    ...nextRules,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        trailingComma: 'none',
        singleQuote: true,
        jsxSingleQuote: true,
        semi: false,
        tabWidth: 2,
        printWidth: 100
      }
    ]
  }
})
