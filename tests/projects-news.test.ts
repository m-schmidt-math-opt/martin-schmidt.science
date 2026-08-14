import assert from 'node:assert/strict';
import test from 'node:test';
import { projects } from '../src/data/projects.ts';
import { formatNewsDate, homepageNews, homepageNewsLimit, news, newsCategories, selectHomepageNews, type NewsItem } from '../src/data/news.ts';
import { readFileSync } from 'node:fs';
import { externalLinkAttributes } from '../src/lib/links.ts';

test('projects have unique IDs, valid statuses, and required fields', () => {
	assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
	for (const project of projects) {
		assert.ok(['current', 'completed'].includes(project.status));
		assert.ok(project.id && project.title && project.description);
	}
	assert.deepEqual(projects.filter((project) => project.status === 'current').map((project) => project.id), ['symbi', 'a3g']);
	assert.equal(projects.filter((project) => project.status === 'completed').length, 12);
	assert.equal(projects.find((project) => project.id === 'a3g')?.title, 'A3G: Aggregative gemischt-ganzzahlige Gleichgewichtsprobleme: Existenz, Approximation und Algorithmen');
	assert.equal(projects.find((project) => project.id === 'a3g')?.displayTitle, 'A3G: Aggregative Mixed-Integer Equilibrium Problems: Existence, Approximation, and Algorithms');
	assert.equal(projects.find((project) => project.id === 'symbi')?.endDate, undefined);
	for (const id of ['energiemarktdesign', 'metis', 'forne']) assert.equal(projects.find((project) => project.id === id)?.endDate, undefined);
});

test('news has unique IDs and valid controlled values', () => {
	assert.equal(new Set(news.map((item) => item.id)).size, news.length);
	for (const item of news) {
		assert.ok(newsCategories.includes(item.category));
		assert.ok(['automatic', 'pinned', 'excluded'].includes(item.homepage));
	}
});

test('the household assignment publication activity derives from its canonical publication', () => {
	const activity = news.find((item) => item.id === 'household-assignment-paper-published');
	assert.ok(activity);
	assert.equal(activity.title, 'Our paper "Computational Methods for the Household Assignment Problem" is now published in MMOR');
	assert.equal(activity.date, '2026-08');
	assert.equal(formatNewsDate(activity.date), 'August 2026');
	assert.equal(activity.publicationKey, 'Friedrich_et_al:2026');
	assert.equal(activity.link, undefined);
	assert.ok(homepageNews.includes(activity));
	assert.equal(news.length, 7);
	const source = readFileSync(new URL('../src/data/news.ts', import.meta.url), 'utf8');
	assert.doesNotMatch(source, /10\.1007\/s00186-026-00933-7|Mathematical Methods of Operations Research|Ulf Friedrich/);
	const homepage = readFileSync(new URL('../src/components/HomepageSections.astro', import.meta.url), 'utf8');
	assert.match(homepage, /publicationAnchor\(item\.publicationKey\)/);
});

test('the canonical GreGOW activity uses the supplied announcement facts and external-link policy', () => {
	const activity = news.find((item) => item.id === 'gregow-2027-save-the-date');
	assert.ok(activity);
	assert.equal(activity.title, 'Save the date: GreGOW, the next edition of the Global Optimization Workshop will be held in Grenoble from the 7th to the 10th of September 2027.');
	assert.equal(activity.date, '2026-08-14');
	assert.deepEqual(activity.link, {
		label: 'GreGOW 2027',
		href: 'https://ghost-team.gitlabpages.inria.fr/events/gregow27/',
	});
	assert.deepEqual(externalLinkAttributes(activity.link.href), { target: '_blank', rel: 'noopener noreferrer' });
	assert.ok(homepageNews.includes(activity));
	assert.deepEqual(news.map((item) => item.id), [
		'gregow-2027-save-the-date',
		'household-assignment-paper-published',
		'icbo-2026-bobilib-talk',
		'europt-2026-plenary',
		'europt-2026-summer-school',
		'tu-clausthal-2026-colloquium',
		'vame-2026-talk',
	]);
});

test('homepage selection includes pins, excludes excluded items, caps at five, and returns newest first', () => {
	const selected = selectHomepageNews(news);
	assert.equal(homepageNewsLimit, 5);
	assert.equal(selected.length, 5);
	assert.ok(news.filter((item) => item.homepage === 'pinned').every((item) => selected.includes(item)));
	assert.ok(selected.every((item) => item.homepage !== 'excluded'));
	assert.deepEqual(selected.map((item) => item.date), [...selected.map((item) => item.date)].sort().reverse());
	assert.deepEqual(selected.map((item) => item.id), [
		'gregow-2027-save-the-date',
		'icbo-2026-bobilib-talk',
		'household-assignment-paper-published',
		'europt-2026-plenary',
		'europt-2026-summer-school',
	]);
});

test('pinned inclusion and category diversity do not override visible chronology', () => {
	const fixture: NewsItem[] = [
		{ id: 'excluded', date: '2026-06-01', category: 'Award', title: 'Excluded', text: 'Excluded.', homepage: 'excluded' },
		{ id: 'p1', date: '2026-04-01', category: 'Talk', title: 'P1', text: 'Pinned.', homepage: 'pinned' },
		{ id: 'n1', date: '2026-05-01', category: 'Talk', title: 'N1', text: 'Recent.', homepage: 'automatic' },
		{ id: 'n2', date: '2026-02-01', category: 'Book', title: 'N2', text: 'Book.', homepage: 'automatic' },
		{ id: 'n3', date: '2026-01-01', category: 'Software', title: 'N3', text: 'Software.', homepage: 'automatic' },
	];
	const selected = selectHomepageNews(fixture, 4);
	assert.ok(selected.some((item) => item.id === 'p1'));
	assert.ok(!selected.some((item) => item.id === 'excluded'));
	assert.ok(selected.findIndex((item) => item.id === 'n1') < selected.findIndex((item) => item.id === 'p1'));
	assert.deepEqual(selected.map((item) => item.date), ['2026-05-01', '2026-04-01', '2026-02-01', '2026-01-01']);
	assert.equal(new Set(selected.map((item) => item.category)).size, 3);
});
