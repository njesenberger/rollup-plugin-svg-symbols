import { Plugin } from 'rollup';
import { relative } from 'path';
import { readFileSync } from 'fs';
import { createFilter, normalizePath } from '@rollup/pluginutils';

const { stringify } = JSON;

export default (options: { baseUrl?: string } = {}): Plugin => {
	const { baseUrl = 'assets/svg' } = options;
	const normalizedBaseUrl = normalizePath(baseUrl);
	const svgFilter = createFilter('**/*.svg', normalizedBaseUrl);

	return {
		name: 'rollup-plugin-svg-symbols',
		transform(_code: string, id: string, options?: { ssr?: boolean }) {
			if (!svgFilter(id) || options?.ssr) {
				return null;
			}

			const relativePath = relative(normalizedBaseUrl, id);
			const svgString: string = readFileSync(id).toString();
			const svgId: string = (
				relativePath
					.replace(`${normalizedBaseUrl}/`, '')
					.replace(/\//g, '-')
					.replace('.svg', '')
			);
			const svgSymbolString: string = svgString.replace('<svg', `<symbol id="${svgId}"`).replace('</svg>', '</symbol>');
			const viewBoxRegex: RegExp = /viewBox="([^"]*)"?/;
			const viewBoxMatch: RegExpMatchArray | null = svgString.match(viewBoxRegex);
			const viewBoxValueIndex: number = 1;
			const viewBox: string = viewBoxMatch?.[viewBoxValueIndex] ?? '';

			return `
				export default { id: ${stringify(svgId)}, viewBox: ${stringify(viewBox)} };
				import { addSymbol } from 'rollup-plugin-svg-symbols/runtime';
				addSymbol(${stringify(svgSymbolString)});
			`;
		},
	};
};
