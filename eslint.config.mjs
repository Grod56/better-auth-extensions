import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	{
		files: ["**/*.{js,ts,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	{ languageOptions: { globals: { ...globals.jest } } },
	tseslint.configs.recommended,
	{
		plugins: {
			js,
		},
		rules: {
			"no-empty-pattern": "error",
		},
	},
	{
		rules: {
			"@typescript-eslint/no-empty-object-type": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
		},
	},
	eslintConfigPrettier,
]);
