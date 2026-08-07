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
