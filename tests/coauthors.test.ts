import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { aboutProfile } from '../src/data/about.ts';
import { coauthorPath, createCoauthorIndex } from '../src/lib/coauthors.ts';
import { parsePublicationAuthors } from '../src/lib/publication-authors.ts';

const bib = readFileSync(new URL('../src/data/publications.bib', import.meta.url), 'utf8');
const records = [...bib.matchAll(/^@(?!COMMENT\b)[A-Za-z]+\{([^,]+),([\s\S]*?)(?=^@|$(?![\s\S]))/gm)].map((match) => {
	const authorField = /^\s*author\s*=\s*\{(.*)\},?\s*$/mi.exec(match[2]);
	assert.ok(authorField, `Missing author field: ${match[1]}`);
	return { id: match[1], authorNames: parsePublicationAuthors(authorField[1]) };
});
const coauthors = createCoauthorIndex(records, aboutProfile.name);
const byName = (name: string) => {
	const coauthor = coauthors.find((entry) => entry.name === name);
	assert.ok(coauthor, `Missing co-author: ${name}`);
	return coauthor;
};

test('BibTeX author names preserve accents, initials, particles, and both recorded separators', () => {
	assert.deepEqual(parsePublicationAuthors(String.raw`Ljubi\'c, Ivana and Leugering, G{\"u}nter`), [
		{ name: 'Ivana Ljubić', givenName: 'Ivana', familyName: 'Ljubić' },
		{ name: 'Günter Leugering', givenName: 'Günter', familyName: 'Leugering' },
	]);
	assert.equal(parsePublicationAuthors('Leugering, Gu\u0308nter')[0].name, 'Günter Leugering');
	assert.deepEqual(parsePublicationAuthors('Martin Schmidt und Frank Vohle').map((author) => author.name), ['Martin Schmidt', 'Frank Vohle']);
	assert.equal(parsePublicationAuthors('Sven de Vries')[0].familyName, 'de Vries');
	assert.equal(parsePublicationAuthors('A. De Filippo')[0].familyName, 'De Filippo');
	assert.equal(parsePublicationAuthors('De Santis, Marianna')[0].name, 'Marianna De Santis');
});

test('the complete bibliography yields the reviewed co-author index with unique clean URLs', () => {
	assert.equal(records.length, 172);
	assert.equal(coauthors.length, 166);
	assert.equal(new Set(coauthors.map((author) => author.id)).size, coauthors.length);
	assert.ok(coauthors.every((author) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(author.id)));
	assert.ok(coauthors.every((author) => coauthorPath(author) === `/publications/coauthors/${author.id}/`));
	assert.ok(!coauthors.some((author) => /^(?:Martin|M\.) Schmidt$/.test(author.name)));
	assert.equal(byName('Ivana Ljubić').id, 'ivana-ljubic');
	assert.equal(byName('Denis Aßmann').id, 'denis-assmann');
});

test('name variants share their publication lists without losing author associations', () => {
	assert.deepEqual(byName('Trine Krogh Boomsma').publicationIds, ['Gabriel_et_al:2025', 'Flocco_et_al:2026']);
	assert.deepEqual(byName('Dominic C. Flocco').publicationIds, ['Gabriel_et_al:2025', 'Flocco_et_al:2026']);
	assert.ok(byName('Falk M. Hante').publicationIds.includes('Domschke_et_al:2015'));
	for (const name of ['Marc E. Pfetsch', 'Marc C. Steinbach', 'Bernhard M. Willert']) {
		assert.ok(byName(name).publicationIds.includes('Martin_et_al:2011'), name);
	}
	const deSantis = coauthors.find((author) => author.name.toLowerCase() === 'marianna de santis');
	assert.deepEqual(deSantis?.publicationIds, ['Venturini_et_al:2025', 'de_Santis_et_al:2022']);
	for (const record of records) {
		const indexedAuthors = coauthors.filter((author) => author.publicationIds.includes(record.id));
		assert.equal(indexedAuthors.length, record.authorNames.length - 1, record.id);
	}
});

test('the ten initials-only names retain exactly their recorded chapter associations', () => {
	const initialsOnly = coauthors.filter((author) => /^(?:[A-Z]\.\s+)+[^.]+$/.test(author.name));
	assert.deepEqual(initialsOnly.map((author) => author.name), [
		'A. De Filippo', 'M. Diekerhof', 'P. Ezran', 'Y. Haddad', 'H. Helmberg',
		'C. Henriques', 'F. Lacalandra', 'M. Lombardi', 'M. Madani', 'M. Milano',
	]);
	for (const author of initialsOnly) {
		assert.deepEqual(author.publicationIds, author.name === 'F. Lacalandra'
			? ['Helmberg_et_al:2021', 'Schmidt_Lacalandra:2021']
			: ['Helmberg_et_al:2021']);
	}
});

test('the index sorts by surname, keeps distinct surnames and given names apart, and groups accented initials', () => {
	const collator = new Intl.Collator('en', { sensitivity: 'base' });
	for (let index = 1; index < coauthors.length; index += 1) {
		const previous = coauthors[index - 1];
		const current = coauthors[index];
		assert.ok((collator.compare(previous.familyName, current.familyName) || collator.compare(previous.name, current.name)) <= 0);
	}
	assert.equal(byName('Sven de Vries').letter, 'D');
	assert.equal(byName('Emre Çelebi').letter, 'C');
	assert.deepEqual(coauthors.filter((author) => author.familyName === 'Schwarz').map((author) => author.name), ['Julian Schwarz', 'Robert Schwarz']);
	assert.equal(byName('Alexandra Schwartz').familyName, 'Schwartz');
});

test('ambiguous initials and URL collisions fail instead of merging distinct people', () => {
	const fixture = (authors: string) => [{ id: 'example', authorNames: parsePublicationAuthors(authors) }];
	assert.throws(() => createCoauthorIndex(fixture('Martin Schmidt and A. Example and Alice Example and Adam Example'), aboutProfile.name), /Ambiguous publication author: A\. Example/);
	assert.throws(() => createCoauthorIndex(fixture('Martin Schmidt and José Example and Jose Example'), aboutProfile.name), /Co-author URLs are not unique/);
});
