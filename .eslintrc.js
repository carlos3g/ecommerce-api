module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 1,
    'no-useless-constructor': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-void': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-unused-vars': [
      0,
      {
        varsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true,
      },
    ],
  },
};
