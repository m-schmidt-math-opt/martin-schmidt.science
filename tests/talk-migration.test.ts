import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { migrateTalksTex } from '../src/data/talks.ts';

const source = readFileSync(new URL('../src/data/talks.tex', import.meta.url), 'utf8');
const migration = migrateTalksTex(source);

test('talk migration accounts for every source record', () => {
	assert.equal(migration.automaticTalks.length, 101);
	assert.equal(migration.needsReview.length, 0);
	assert.equal(migration.automaticTalks.length + migration.needsReview.length, 101);
});

test('automatic talk records retain complete source provenance', () => {
	for (const talk of migration.automaticTalks) {
		assert.match(talk.id, /^talk-\d{4}$/);
		assert.ok(talk.title);
		assert.ok(talk.date.start);
		assert.ok(talk.eventName);
		assert.ok(talk.source.rawArguments.length >= 2 && talk.source.rawArguments.length <= 5);
		assert.ok(talk.source.rawLatex.startsWith('\\item \\talk'));
	}
});

test('review records remain raw and ordered for interactive resolution', () => {
	assert.equal(migration.needsReview.length, 0);
	assert.deepEqual(
		migration.needsReview.map((record) => record.recordNumber),
		[...migration.needsReview].sort((a, b) => a.recordNumber - b.recordNumber).map((record) => record.recordNumber),
	);
});
