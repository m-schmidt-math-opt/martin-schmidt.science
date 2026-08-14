import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

// Build-time integration assertions: source invariants are also exercised by `astro build`.
const bib = readFileSync(new URL('../src/data/publications.bib', import.meta.url), 'utf8');

test('the bibliography has unique, case-sensitive citation keys', () => {
	const keys = [...bib.matchAll(/^@(?!COMMENT\b)[A-Za-z]+\s*[({]\s*([^,\s]+)/gm)].map((match) => match[1]);
	assert.ok(keys.length > 0);
	assert.equal(new Set(keys).size, keys.length);
});

test('the complete canonical bibliography and DOI identities remain unique', () => {
	const keys = [...bib.matchAll(/^@(?!COMMENT\b)[A-Za-z]+\s*[({]\s*([^,\s]+)/gm)].map((match) => match[1]);
	assert.equal(keys.length, 165);
	const dois = [...bib.matchAll(/^\s*doi\s*=\s*\{([^}]+)\}/gmi)]
		.map((match) => match[1].toLowerCase().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, ''));
	assert.equal(new Set(dois).size, dois.length);
});

test('the verified ECC paper replaces its former preprint representation without changing its stable key', () => {
	assert.match(bib, /@inproceedings\{Fabiani_et_al:2024,[\s\S]*2025 European Control Conference \(ECC\)[\s\S]*10\.23919\/ECC65951\.2025\.11187084/);
	assert.doesNotMatch(bib, /@techreport\{Fabiani_et_al:2024,/);
	assert.equal([...bib.matchAll(/@(?:inproceedings|techreport)\{Fabiani_et_al:2024,/g)].length, 1);
});

test('selected publications contain keys only, not duplicate bibliography fields', () => {
	const selected = readFileSync(new URL('../src/data/selected-publications.ts', import.meta.url), 'utf8');
	assert.doesNotMatch(selected, /\b(title|author|journal|publisher|year)\s*:/i);
	assert.deepEqual([...selected.matchAll(/'([^']+)'/g)].map((match) => match[1]), [
		'Beck_Ljubic_Schmidt:2026',
		'Beck_et_al:2023a',
		'Kleinert_et_al:2020',
		'Geissler_et_al:2017a',
		'Krug_et_al:2021b',
		'Hojny_et_al:2020',
	]);
});

test('publication types use the requested human-readable mapping and the confirmed Review exception', () => {
	const parser = readFileSync(new URL('../src/lib/publications.ts', import.meta.url), 'utf8');
	assert.match(parser, /entry\.type === 'article'\) return 'journal'/);
	assert.match(parser, /\['inproceedings', 'conference'\]\.includes\(entry\.type\)\) return 'conference'/);
	assert.match(parser, /\['inbook', 'incollection'\]\.includes\(entry\.type\)\) return 'chapter'/);
	assert.match(parser, /entry\.type === 'book'\) return 'book'/);
	assert.match(parser, /\['techreport', 'report'\]\.includes\(entry\.type\)\) return 'preprint'/);
	for (const label of ['Journal Article', 'Conference Proceedings Paper', 'Book Chapter', 'Book', 'Preprint']) assert.match(parser, new RegExp(label));
	assert.match(parser, /classificationResolved:/);
	assert.match(bib, /@misc\{Schmidt:2020,/);
	assert.match(parser, /entry\.key === 'Schmidt:2020'\) return 'review'/);
	assert.match(parser, /classificationResolved: entry\.key === 'Schmidt:2020'/);
});

test('All Publications can render canonical container metadata while omitting missing fields', () => {
	const parser = readFileSync(new URL('../src/lib/publications.ts', import.meta.url), 'utf8');
	const list = readFileSync(new URL('../src/components/PublicationList.astro', import.meta.url), 'utf8');
	const page = readFileSync(new URL('../src/pages/publications.astro', import.meta.url), 'utf8');
	for (const field of ['fields.volume', 'fields.number', 'fields.pages', 'fields.doi']) assert.match(parser, new RegExp(field.replace('.', '\\.')));
	assert.match(list, /publication\.metadata\.length > 0/);
	assert.match(list, /externalLinkAttributes\(item\.href\)/);
	assert.match(page, /showBibliographicMetadata/);
});

test('the two verified legacy works and working publication artifact are canonical BibTeX records', () => {
	assert.match(bib, /@book\{Kleinert_Schmidt:2022,[\s\S]*Bessere Fotos: Bilder diskutieren, verstehen und verbessern/);
	assert.match(bib, /@thesis\{Schmidt:Studienarbeit,[\s\S]*Approximation der medialen Achse polygonal berandeter Gebiete/);
	assert.match(bib, /The Cost of Not Knowing Enough:[\s\S]*url-code\s*=\s*\{https:\/\/github\.com\/m-schmidt-math-opt\/cost-of-not-knowing-enough\}/);
	assert.doesNotMatch(bib, /chao-peck\.zip|portfolio-data\.zip|www\.ifam\.uni-hannover\.de\/~mcs\/papers\/data/);
	const parser = readFileSync(new URL('../src/lib/publications.ts', import.meta.url), 'utf8');
	assert.match(parser, /return 'Code'/);
	assert.match(parser, /return 'Data'/);
	assert.match(parser, /return 'Source files'/);
});

test('verified publication months are parsed, displayed conditionally, and used for sorting', () => {
	assert.match(bib, /@article\{Friedrich_et_al:2026,[\s\S]*?month\s*=\s*aug/);
	assert.match(bib, /@article\{Reinmann_et_al:2022,[\s\S]*?month\s*=\s*Sep/);
	assert.match(bib, /@article\{Vohle_Schmidt:2021,[\s\S]*?month\s*=\s*Aug/);
	const parser = readFileSync(new URL('../src/lib/publications.ts', import.meta.url), 'utf8');
	const list = readFileSync(new URL('../src/components/PublicationList.astro', import.meta.url), 'utf8');
	assert.match(parser, /\(b\.month \?\? 0\) - \(a\.month \?\? 0\)/);
	assert.match(list, /publication\.month \?/);
});

test('external publication links use the shared new-tab policy', () => {
	const list = readFileSync(new URL('../src/components/PublicationList.astro', import.meta.url), 'utf8');
	assert.match(list, /externalLinkAttributes\(link\.href\)/);
});
