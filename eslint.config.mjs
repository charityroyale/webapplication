import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

import onlyError from 'eslint-plugin-only-error'
import preferArrow from 'eslint-plugin-prefer-arrow'
import next from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

// https://github.com/sindresorhus/globals/issues/239
const GLOBALS_BROWSER_FIX = Object.assign({}, globals.browser, {
    AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope ']
});
delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default [
	{
		ignores: [
			'scripts/**/*',
			'node_modules/*',
            'dist/*',
            '.next/*',
            'out/*',
            'coverage',
            'eslint.config.mjs',
		],
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:react/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:prettier/recommended',
			'plugin:@next/next/recommended'
		)
	),
	{
		plugins: {
            'only-error': onlyError,
            'prefer-arrow': preferArrow,
            '@next/next': fixupPluginRules(next),
		},
		languageOptions: {
			globals: {
				...GLOBALS_BROWSER_FIX,
				...globals.node,
			},

			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'react/prop-types': [
				2,
				{
					ignore: ['children'],
				},
			],

			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@next/next/no-img-element': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
		},
	},
]
