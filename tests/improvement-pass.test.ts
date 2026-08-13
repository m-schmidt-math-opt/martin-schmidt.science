import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { news } from '../src/data/news.ts';

test('requested canonical news and photography-book titles are exact', () => {
	assert.equal(news.find((item) => item.id === 'tu-clausthal-2026-colloquium')?.title, 'Invited colloquium talk at TU Clausthal');
	const bibliography = readFileSync(new URL('../src/data/publications.bib', import.meta.url), 'utf8');
	assert.match(bibliography, /@book\{Kleinert_Schmidt:2022,[\s\S]*title\s*=\s*\{Bessere Fotos: Bilder diskutieren, verstehen und verbessern\}/);
	assert.doesNotMatch(bibliography, /Off-Topic/);
});
