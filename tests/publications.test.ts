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

test('selected publications contain keys only, not duplicate bibliography fields', () => {
	const selected = readFileSync(new URL('../src/data/selected-publications.ts', import.meta.url), 'utf8');
	assert.doesNotMatch(selected, /\b(title|author|journal|publisher|year)\s*:/i);
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
