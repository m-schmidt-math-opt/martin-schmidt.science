import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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

test('Full Archive is the complete canonical talk set exactly once', () => {
	const talksPage = readFileSync(new URL('../src/pages/talks.astro', import.meta.url), 'utf8');
	assert.match(talksPage, /title: 'Full Archive', items: archive/);
	assert.match(talksPage, /const archive = \[\.\.\.talks\]\.sort/);
	assert.equal(new Set(talks.map((talk) => talk.id)).size, talks.length);
	assert.ok(talks.some((talk) => talk.types.includes('invited')));
});

test('Squarespace-audited dates and date ranges remain canonical', () => {
	assert.equal(talks.find((talk) => talk.id === 'talk-0014')?.date.start, '2024-11-10');
	assert.equal(talks.find((talk) => talk.id === 'talk-0030')?.date.start, '2023-02-06');
	assert.deepEqual(talks.find((talk) => talk.id === 'talk-0045')?.date, {
		start: '2021-11-30',
		end: '2021-12-01',
		display: '30 November–1 December 2021',
	});
	assert.equal(talks.find((talk) => talk.id === 'talk-0053')?.date.start, '2020-10-26');
});

test('explicit source classifications and delivery metadata are preserved without title annotations', () => {
	assert.ok(talks.find((talk) => talk.id === 'talk-0040')?.types.includes('invited'));
	for (const id of ['talk-0041', 'talk-0043', 'talk-0044', 'talk-0046', 'talk-0051', 'talk-0052', 'talk-0053', 'talk-0054']) {
		assert.equal(talks.find((talk) => talk.id === id)?.deliveryMode, 'online');
	}
	for (const id of ['talk-0051', 'talk-0052', 'talk-0053', 'talk-0054']) {
		assert.doesNotMatch(talks.find((talk) => talk.id === id)?.title ?? '', /via (?:Zoom|BigBlueButton)/i);
	}
});

test('verified legacy slide and recording links remain attached to canonical talks', () => {
	const linkedTalks = talks.filter((talk) => talk.links.length > 0);
	assert.ok(linkedTalks.some((talk) => talk.links.some((link) => link.kind === 'slides')));
	assert.ok(linkedTalks.some((talk) => talk.links.some((link) => link.kind === 'video')));
	assert.ok(talks.find((talk) => talk.id === 'talk-0043')?.links.some((link) => link.href === 'https://youtu.be/IwUoVF3H7cc'));
	assert.equal(talks.find((talk) => talk.id === 'talk-0049')?.links.filter((link) => link.kind === 'video').length, 3);
});

test('talks absent from the current Squarespace list remain preserved canonically', () => {
	for (const id of ['talk-0066', 'talk-0070']) assert.ok(talks.some((talk) => talk.id === id));
});

test('talk resources have no runtime dependency on the old Squarespace site', () => {
	const serialized = JSON.stringify(talks);
	assert.doesNotMatch(serialized, /squarespace/i);
	const localResources = talks.flatMap((talk) => talk.links).filter((resource) => resource.href.startsWith('/files/'));
	assert.equal(localResources.length, 10);
	for (const resource of localResources) {
		assert.ok(existsSync(new URL(`../public${resource.href}`, import.meta.url)), `Missing local talk resource: ${resource.href}`);
	}
});
