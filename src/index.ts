import { relative } from 'path';
import { readFileSync } from 'fs';
import { createFilter, normalizePath } from '@rollup/pluginutils';

const { stringify } = JSON;

export default (baseUrl: string = 'assets/svg') => {
	const normalizedBaseUrl = `${normalizePath(baseUrl)}/`;
	const svgFilter = createFilter(['**/*.svg'], normalizedBaseUrl);

	return {
		name: 'rollup-plugin-svg-symbols',
		transform(id: string) {
			if (!svgFilter(id)) {
				return null;
			}

			const relativePath = relative(normalizedBaseUrl, id);
			console.log({relativePath});
			console.log({id});

			const svgString: string = readFileSync(id).toString();
			const svgId: string = (
				relativePath
					.replace(normalizedBaseUrl, '')
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
				import { addSymbol } from '@/rollup-plugin-svg-symbols/runtime';
				addSymbol(${stringify(svgSymbolString)});
			`;
		},
	};
};
