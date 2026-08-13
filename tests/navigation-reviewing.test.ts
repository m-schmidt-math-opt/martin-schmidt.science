import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { reviewingVenues } from '../src/data/reviewing.ts';

const pages = ['research', 'publications', 'group', 'software-data', 'teaching', 'about', 'talks', 'projects', 'theses'];

test('multi-section pages use the shared SectionNav with internal links', () => {
	for (const page of pages) {
		const source = readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8');
		assert.match(source, /import SectionNav from '\.\.\/components\/SectionNav\.astro'/);
		assert.match(source, /<SectionNav /);
	}
	const component = readFileSync(new URL('../src/components/SectionNav.astro', import.meta.url), 'utf8');
	assert.match(component, /href=\{`#\$\{section\.id\}`\}/);
	assert.doesNotMatch(component, /target=|externalLinkAttributes/);
});

test('Talks exposes the four requested section links and stable anchors', () => {
	const talks = readFileSync(new URL('../src/pages/talks.astro', import.meta.url), 'utf8');
	for (const title of ['Recent Talks', 'Plenary & Keynote Talks', 'Invited Talks', 'Full Archive']) assert.match(talks, new RegExp(title.replace('&', '&')));
	for (const id of ['recent-talks', 'plenary-keynote-talks', 'invited-talks', 'full-archive']) assert.match(talks, new RegExp(id));
});

test('reviewing page and About derive from the complete canonical old-site list', () => {
	assert.equal(reviewingVenues.length, 41);
	assert.equal(new Set(reviewingVenues.map((venue) => venue.id)).size, reviewingVenues.length);
	const page = readFileSync(new URL('../src/pages/reviewing.astro', import.meta.url), 'utf8');
	const about = readFileSync(new URL('../src/pages/about.astro', import.meta.url), 'utf8');
	assert.match(page, /reviewingVenues\.map/);
	assert.doesNotMatch(page, />Reviewing Venues</);
	assert.match(about, /href="\/reviewing\/"/);
	assert.doesNotMatch(about, /Plenary & Keynote Talks|Courses & Schools|plenary-talks|id: 'courses'/);
});

test('About and Teaching section navigation contains only rendered sections', () => {
	const about = readFileSync(new URL('../src/pages/about.astro', import.meta.url), 'utf8');
	const teaching = readFileSync(new URL('../src/pages/teaching.astro', import.meta.url), 'utf8');
	assert.doesNotMatch(about, /plenary-talks|id: 'courses'/);
	assert.doesNotMatch(teaching, /past-courses|Past Courses/);
});

test('the exact source Figure 1 crop is a local asset and publication DOM IDs are section-namespaced', () => {
	assert.ok(existsSync(new URL('../public/images/research-gnep-nep-figure1.png', import.meta.url)));
	const list = readFileSync(new URL('../src/components/PublicationList.astro', import.meta.url), 'utf8');
	assert.match(list, /\$\{sectionId\}-publication-/);
});
