const root: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
root.setAttribute('aria-hidden', 'true');
root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
root.style.position = 'absolute';
root.style.width = '0';
root.style.height = '0';

const insertRoot = (): void => {
	document.body.insertBefore(root, document.body.firstChild);
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', insertRoot);
} else {
	insertRoot();
}

export const addSymbol = (svgSymbolString: string): void => {
	root.insertAdjacentHTML('beforeend', svgSymbolString);
};
