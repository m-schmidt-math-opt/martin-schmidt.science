import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { introductoryCourseTalks, invitedTalks, plenaryAndKeynoteTalks, selectedPlenaryAndKeynoteTalks, talks } from '../src/data/talks.ts';

test('all 102 talks remain represented with unique IDs after adding the verified UNIVERS course', () => {
	assert.equal(talks.length, 102);
	assert.equal(new Set(talks.map((talk) => talk.id)).size, 102);
	const univers = talks.find((talk) => talk.id === 'talk-univers-winter-school-2021');
	assert.ok(univers);
	assert.equal(univers.eventKind, 'school');
	assert.ok(univers.types.includes('course'));
});

test('About talk groups are explicit derivatives of the canonical talks', () => {
	assert.ok(selectedPlenaryAndKeynoteTalks.length > 0);
	assert.ok(selectedPlenaryAndKeynoteTalks.every((talk) => talk.curatedGroups?.includes('plenary-keynote')));
	assert.ok(introductoryCourseTalks.length > 0);
	assert.ok(introductoryCourseTalks.every((talk) => talk.curatedGroups?.includes('introductory-course') && talk.types.includes('course')));
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

test('the latest canonical talk is surfaced first in the Talks page recent section', () => {
	const talksPage = readFileSync(new URL('../src/pages/talks.astro', import.meta.url), 'utf8');
	assert.match(talksPage, /const recentTalks = archive\.slice\(0, 6\)/);
	assert.match(talksPage, /title: 'Recent Talks', items: recentTalks/);
	assert.equal(talks[0].date.start, '2026-08-03');
});
