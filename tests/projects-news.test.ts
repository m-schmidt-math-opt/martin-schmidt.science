import assert from 'node:assert/strict';
import test from 'node:test';
import { projects } from '../src/data/projects.ts';
import { news, newsCategories, selectHomepageNews, type NewsItem } from '../src/data/news.ts';

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

test('homepage selection includes pins, excludes excluded items, caps at four, and returns newest first', () => {
	const selected = selectHomepageNews(news);
	assert.equal(selected.length, 4);
	assert.ok(news.filter((item) => item.homepage === 'pinned').every((item) => selected.includes(item)));
	assert.ok(selected.every((item) => item.homepage !== 'excluded'));
	assert.deepEqual(selected.map((item) => item.date), [...selected.map((item) => item.date)].sort().reverse());
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
