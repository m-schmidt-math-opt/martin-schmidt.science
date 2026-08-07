import assert from 'node:assert/strict';
import test from 'node:test';
import { invitedTalks, plenaryAndKeynoteTalks, talks } from '../src/data/talks.ts';

test('all 101 talks remain represented with unique IDs', () => {
	assert.equal(talks.length, 101);
	assert.equal(new Set(talks.map((talk) => talk.id)).size, 101);
});

test('featured talk collections use only matching explicit types', () => {
	assert.ok(plenaryAndKeynoteTalks.length > 0);
	assert.ok(plenaryAndKeynoteTalks.every((talk) => talk.types.includes('plenary') || talk.types.includes('keynote')));
	assert.ok(invitedTalks.length > 0);
	assert.ok(invitedTalks.every((talk) => talk.types.includes('invited')));
});

test('unspecified talks are never inferred to be contributed', () => {
	assert.ok(talks.filter((talk) => talk.types.length === 0 || talk.types.includes('unspecified')).every((talk) => !talk.types.includes('contributed')));
});
