import { latexToText } from './bibtex-text.ts';

export interface PublicationAuthor {
	name: string;
	givenName: string;
	familyName: string;
}

const surnameParticles = new Set(['de', 'del', 'della', 'der', 'di', 'du', 'la', 'le', 'van', 'von']);

export function parsePublicationAuthors(value = ''): PublicationAuthor[] {
	return value.split(/\s+(?:and|und)\s+/i).filter((name) => name.trim()).map((rawName) => {
		const parts = latexToText(rawName).split(',').map((part) => part.trim());
		let givenName: string;
		let familyName: string;
		if (parts.length > 1) {
			familyName = parts[0];
			givenName = parts.slice(1).join(' ');
		} else {
			const words = parts[0].split(' ');
			let familyStart = words.length - 1;
			while (familyStart > 1 && surnameParticles.has(words[familyStart - 1].toLocaleLowerCase('en'))) familyStart -= 1;
			givenName = words.slice(0, familyStart).join(' ');
			familyName = words.slice(familyStart).join(' ');
		}
		return { name: [givenName, familyName].filter(Boolean).join(' '), givenName, familyName };
	});
}
