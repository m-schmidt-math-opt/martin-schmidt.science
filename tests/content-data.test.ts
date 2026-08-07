import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { aboutProfile, academicPositions } from '../src/data/about.ts';
import { resources } from '../src/data/resources.ts';
import { currentTeaching, pastCourses, teachingResources } from '../src/data/teaching.ts';

test('resources have unique IDs and stable one-sentence descriptions', () => {
	assert.equal(new Set(resources.map((resource) => resource.id)).size, resources.length);
	for (const resource of resources) {
		assert.match(resource.description, /\.$/);
		assert.ok(Array.isArray(resource.links));
	}
});

test('current teaching contains the four verified overlapping-semester courses', () => {
	assert.deepEqual(currentTeaching.map((course) => [course.term, course.title]), [
		['Winter Term 2026/2027', 'Linear Algebra'],
		['Winter Term 2026/2027', 'Linear Optimization'],
		['Summer Term 2026', 'Nonlinear Optimization'],
		['Summer Term 2026', 'Bilevel Optimization 2'],
	]);
	assert.ok(Array.isArray(pastCourses));
});

test('verified about facts have one canonical source', () => {
	assert.equal(aboutProfile.position, 'Professor of Nonlinear Optimization');
	assert.equal(academicPositions[0]?.organization, aboutProfile.institution);
	assert.equal(aboutProfile.profileLinks.find((link) => link.label === 'ORCID')?.href, 'https://orcid.org/0000-0001-6208-5677');
	assert.equal(aboutProfile.profileLinks.find((link) => link.label === 'Google Scholar')?.href, 'https://scholar.google.com/citations?user=IiZJIdEAAAAJ');
	assert.equal(aboutProfile.profileLinks.find((link) => link.label === 'Bluesky')?.href, 'https://bsky.app/profile/schmaidt.bsky.social');
	assert.equal(aboutProfile.profileLinks.find((link) => link.label === 'Instagram')?.href, 'https://www.instagram.com/schmaidt.de/');
	const aboutPage = readFileSync(new URL('../src/pages/about.astro', import.meta.url), 'utf8');
	assert.doesNotMatch(aboutPage, /office hours|phone number|office room|Full CV|pending verification/i);
});

test('resource editorial statuses are explicit', () => {
	assert.equal(resources.find((resource) => resource.id === 'bobilib')?.featured, true);
	assert.equal(resources.find((resource) => resource.id === 'bobilib')?.status, 'active');
	assert.equal(resources.find((resource) => resource.id === 'gaslib')?.status, 'active');
	assert.equal(resources.find((resource) => resource.id === 'lamatto')?.status, 'archived');
	assert.equal(resources.find((resource) => resource.id === 'diophantine-bit-commitment')?.status, 'archived');
	assert.equal(resources.find((resource) => resource.id === 'cryptool-diophantine-bit-commitment')?.status, 'archived');
	assert.equal(resources.some((resource) => resource.id === 'robust-electricity-market-equilibria'), false);
});

test('the retained teaching resource and intentional PDF exclusions are explicit', () => {
	assert.equal(teachingResources.find((resource) => resource.id === 'how-to-give-a-talk')?.links[0]?.href, 'https://martinschmidt.squarespace.com/s/how-to-give-a-talk-kny9.pdf');
	const serialized = JSON.stringify(teachingResources);
	assert.doesNotMatch(serialized, /Brief overview of potential topics|Detailed description of potential topics/);
	assert.doesNotMatch(serialized, /Nonlinear Optimization.*\.pdf|Lineare Algebra.*\.pdf|Numerical Optimization.*\.pdf/i);
	const teachingPage = readFileSync(new URL('../src/pages/teaching.astro', import.meta.url), 'utf8');
	assert.match(teachingPage, /href="\/theses\/"/);
	assert.doesNotMatch(teachingPage, /from ['"]\.\.\/data\/theses/);
});
