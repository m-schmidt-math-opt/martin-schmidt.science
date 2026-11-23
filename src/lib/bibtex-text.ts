const combiningAccents: Record<string, string> = {
	'"': '\u0308', "'": '\u0301', '`': '\u0300', '~': '\u0303', '^': '\u0302',
	'=': '\u0304', '.': '\u0307', u: '\u0306', v: '\u030c', H: '\u030b', c: '\u0327', k: '\u0328',
};

export function latexToText(value = ''): string {
	let text = value;
	text = text.replace(/\$\\Gamma\$/g, 'Γ');
	text = text.replace(/\$([^$]+)\$/g, '$1');
	text = text.replace(/\\url\{([^}]*)\}/g, '$1').replace(/\\enquote\{([^}]*)\}/g, '“$1”');
	text = text.replace(/\\(?:textit|emph|textbf|mathrm|operatorname)\{([^{}]*)\}/g, '$1');
	text = text.replace(/\\(["'`~^=.uvHck])\s*\{?([A-Za-z])\}?/g, (_, mark: string, letter: string) => `${letter}${combiningAccents[mark]}`);
	return text
		.replace(/\\ss\b/g, 'ß')
		.replace(/\{([“”])\}/g, '$1')
		.replace(/[{}]/g, '')
		.replace(/\\&/g, '&')
		.replace(/\\_/g, '_')
		.replace(/---/g, '—')
		.replace(/--/g, '–')
		.replace(/~+/g, ' ')
		.replace(/\\([#$%])/g, '$1')
		.replace(/\s+/g, ' ')
		.trim()
		.normalize('NFC');
}
