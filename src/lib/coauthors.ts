import { parsePublicationAuthors, type PublicationAuthor } from './publication-authors.ts';

export interface AuthoredPublication {
	id: string;
	authorNames: PublicationAuthor[];
}

export interface Coauthor {
	id: string;
	name: string;
	familyName: string;
	letter: string;
	publicationIds: string[];
}

const collator = new Intl.Collator('en', { sensitivity: 'base' });
const nameTokens = (name: string) => name.toLocaleLowerCase('en').replaceAll('.', '').split(/\s+/).filter(Boolean);
const familyKey = (author: PublicationAuthor) => author.familyName.toLocaleLowerCase('en');
const authorKey = (author: PublicationAuthor) => `${familyKey(author)},${nameTokens(author.givenName).join(' ')}`;

// Merge initials and omitted middle initials only when the bibliography supplies
// a unique fuller name. Conflicting candidates must be resolved in the source.
function expandsName(short: PublicationAuthor, full: PublicationAuthor): boolean {
	if (familyKey(short) !== familyKey(full)) return false;
	const shortTokens = nameTokens(short.givenName);
	const fullTokens = nameTokens(full.givenName);
	if (shortTokens.length > fullTokens.length) return false;
	return shortTokens.every((token, index) => token === fullTokens[index]
		|| (token.length === 1 && fullTokens[index].startsWith(token)))
		&& fullTokens.slice(shortTokens.length).every((token) => token.length === 1);
}

export function createCoauthorIndex(publications: readonly AuthoredPublication[], ownerName: string): Coauthor[] {
	const names = new Map<string, PublicationAuthor>();
	for (const publication of publications) {
		for (const author of publication.authorNames) names.set(authorKey(author), names.get(authorKey(author)) ?? author);
	}
	const families = Map.groupBy([...names.values()], familyKey);
	const canonicalNames = new Map<string, PublicationAuthor>();
	for (const author of names.values()) {
		const candidates = (families.get(familyKey(author)) ?? []).filter((candidate) => expandsName(author, candidate));
		const fullest = candidates.filter((candidate) => !candidates.some((other) => authorKey(candidate) !== authorKey(other) && expandsName(candidate, other)));
		if (fullest.length !== 1) throw new Error(`Ambiguous publication author: ${author.name}. Check the names in publications.bib.`);
		canonicalNames.set(authorKey(author), fullest[0]);
	}
	const owner = parsePublicationAuthors(ownerName)[0];
	if (!owner) throw new Error('The co-author index requires the site owner’s name.');
	const ownerKey = authorKey(canonicalNames.get(authorKey(owner)) ?? owner);
	const coauthors = new Map<string, Coauthor>();
	for (const publication of publications) {
		for (const author of publication.authorNames) {
			const canonical = canonicalNames.get(authorKey(author))!;
			const key = authorKey(canonical);
			if (key === ownerKey) continue;
			if (!coauthors.has(key)) {
				const id = canonical.name.toLocaleLowerCase('en').replaceAll('ß', 'ss')
					.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
				const letter = canonical.familyName.normalize('NFD').replace(/\p{M}/gu, '')[0].toLocaleUpperCase('en');
				coauthors.set(key, { id, name: canonical.name, familyName: canonical.familyName, letter, publicationIds: [] });
			}
			const coauthor = coauthors.get(key)!;
			if (!coauthor.publicationIds.includes(publication.id)) coauthor.publicationIds.push(publication.id);
		}
	}
	const result = [...coauthors.values()].sort((a, b) => collator.compare(a.familyName, b.familyName) || collator.compare(a.name, b.name));
	if (new Set(result.map((coauthor) => coauthor.id)).size !== result.length) throw new Error('Co-author URLs are not unique. Check the names in publications.bib.');
	return result;
}

export const coauthorPath = (coauthor: Pick<Coauthor, 'id'>) => `/publications/coauthors/${coauthor.id}/`;
