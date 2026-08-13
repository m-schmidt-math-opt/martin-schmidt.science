import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
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

test('homepage profile teaser derives complementary facts from canonical About data', () => {
	const homepageSections = readFileSync(new URL('../src/components/HomepageSections.astro', import.meta.url), 'utf8');
	assert.match(homepageSections, /aboutProfile, academicLeadership, academicPositions, editorialService/);
	assert.match(homepageSections, /academicPositions\.flatMap/);
	assert.doesNotMatch(homepageSections, /aboutProfile\.(?:position|institution)/);
	assert.doesNotMatch(homepageSections, /Research in bilevel, mixed-integer, nonlinear, robust/);
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

test('homepage resource gateway renders canonical descriptions without a featured label', () => {
	const homepageSections = readFileSync(new URL('../src/components/HomepageSections.astro', import.meta.url), 'utf8');
	const resourceList = readFileSync(new URL('../src/components/ResourceList.astro', import.meta.url), 'utf8');
	const bobilibDescription = resources.find((resource) => resource.id === 'bobilib')?.description;
	assert.match(homepageSections, /<ResourceList resources=\{featuredResources\} compact gateway \/>/);
	assert.ok(bobilibDescription);
	assert.doesNotMatch(homepageSections, new RegExp(bobilibDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	assert.equal(bobilibDescription, 'An open library of bilevel optimization benchmark instances in a standardized format.');
	assert.match(resourceList, /<p class:list=\{\{ 'pending-copy': resource\.descriptionPending \}\}>\{resource\.description\}<\/p>/);
	assert.doesNotMatch(resourceList, /Featured resource/i);
});

test('the retained teaching resources use local verified PDFs and intentional exclusions remain explicit', () => {
	assert.equal(teachingResources.find((resource) => resource.id === 'lecture-cycle')?.links[0]?.href, '/files/optimization-lecture-cycle.pdf');
	assert.equal(teachingResources.find((resource) => resource.id === 'how-to-give-a-talk')?.links[0]?.href, '/files/how-to-give-a-talk.pdf');
	assert.ok(existsSync(new URL('../public/files/optimization-lecture-cycle.pdf', import.meta.url)));
	assert.ok(existsSync(new URL('../public/files/how-to-give-a-talk.pdf', import.meta.url)));
	const serialized = JSON.stringify(teachingResources);
	assert.doesNotMatch(serialized, /martinschmidt\.squarespace\.com/);
	assert.doesNotMatch(serialized, /Brief overview of potential topics|Detailed description of potential topics/);
	assert.doesNotMatch(serialized, /Nonlinear Optimization.*\.pdf|Lineare Algebra.*\.pdf|Numerical Optimization.*\.pdf/i);
	const teachingPage = readFileSync(new URL('../src/pages/teaching.astro', import.meta.url), 'utf8');
	assert.match(teachingPage, /href="\/theses\/"/);
	assert.doesNotMatch(teachingPage, /from ['"]\.\.\/data\/theses/);
	assert.doesNotMatch(teachingPage, /Past Courses|past-courses/);
	assert.match(teachingPage, /description="Current teaching, recurring subjects, lecture resources, and supervised theses/);
	assert.equal(pastCourses.length, 11);
});

test('active featured resources resolve paper links by canonical BibTeX key', () => {
	assert.deepEqual(resources.find((resource) => resource.id === 'bobilib')?.relatedPublicationKeys, ['Thuerauf_et_al:2026']);
	assert.deepEqual(resources.find((resource) => resource.id === 'gaslib')?.relatedPublicationKeys, ['Schmidt_et_al:2017b']);
	const resourceList = readFileSync(new URL('../src/components/ResourceList.astro', import.meta.url), 'utf8');
	assert.match(resourceList, /publicationByKey/);
	assert.match(resourceList, /link\.label === 'DOI'/);
	assert.doesNotMatch(resourceList, /10\.1007\/s12532-025-00294-y|10\.3390\/data2040040/);
});
