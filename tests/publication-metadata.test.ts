import assert from 'node:assert/strict';
import test from 'node:test';
import { createPublicationMetadata } from '../src/lib/publication-metadata.ts';

test('publication metadata excludes the primary container and DOI while retaining secondary details', () => {
	const fixtures = [
		{
			name: 'article',
			type: 'journal' as const,
			venue: 'Mathematical Programming Computation',
			fields: { volume: '17', number: '2', pages: '1–20' },
			expected: ['Vol. 17', 'No. 2', 'pp. 1–20'],
		},
		{
			name: 'book',
			type: 'book' as const,
			venue: 'Cambridge University Press',
			fields: { publisher: 'Cambridge University Press', series: 'Optimization', edition: '2' },
			expected: ['Series: Optimization', 'Edition: 2'],
		},
		{
			name: 'conference paper',
			type: 'conference' as const,
			venue: 'European Control Conference',
			fields: { pages: '2775–2780', publisher: 'IEEE' },
			expected: ['pp. 2775–2780', 'IEEE'],
		},
		{
			name: 'book chapter',
			type: 'chapter' as const,
			venue: 'Encyclopedia of Optimization',
			fields: { pages: '1–8', publisher: 'Springer' },
			expected: ['pp. 1–8', 'Springer'],
		},
		{
			name: 'technical report',
			type: 'preprint' as const,
			venue: 'Optimization Online',
			fields: { reportType: 'Technical report', number: '24-01' },
			expected: ['Technical report', 'No. 24-01'],
		},
	];

	for (const fixture of fixtures) {
		const metadata = createPublicationMetadata(fixture.type, fixture.venue, fixture.fields);
		assert.deepEqual(metadata.map((item) => item.label), fixture.expected, fixture.name);
		assert.ok(metadata.every((item) => item.label !== fixture.venue), `${fixture.name} repeats its venue`);
		assert.ok(metadata.every((item) => item.label !== 'DOI' && item.href === undefined), `${fixture.name} repeats DOI`);
	}
});

test('BOBILib keeps its venue and DOI out of secondary metadata', () => {
	const venue = 'Mathematical Programming Computation';
	const metadata = createPublicationMetadata('journal', venue, {});
	assert.deepEqual(metadata, []);
});
