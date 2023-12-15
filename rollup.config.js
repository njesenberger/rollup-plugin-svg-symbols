import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
	input: [
		'./src/index.ts',
		'./src/runtime.ts',
	],
	output: [
		{
			entryFileNames: 'es/[name].mjs',
			format: 'es',
			dir: 'dist',
		},
		{
			entryFileNames: 'cjs/[name].js',
			format: 'cjs',
			dir: 'dist',
			exports: 'auto',
		},
	],
	plugins: [
		typescript(),
	],
	external: [
		'@rollup/pluginutils',
		'path',
		'fs',
	],
});
