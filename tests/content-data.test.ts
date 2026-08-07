import assert from 'node:assert/strict';
import test from 'node:test';
import { aboutProfile, academicPositions } from '../src/data/about.ts';
import { resources } from '../src/data/resources.ts';
import { currentTeaching, pastCourses } from '../src/data/teaching.ts';

test('resources have unique IDs and stable one-sentence descriptions', () => {
	assert.equal(new Set(resources.map((resource) => resource.id)).size, resources.length);
	for (const resource of resources) {
		assert.match(resource.description, /\.$/);
		assert.ok(Array.isArray(resource.links));
	}
});

test('teaching records are structured and ready for verified entries', () => {
	assert.ok(Array.isArray(currentTeaching));
	assert.ok(Array.isArray(pastCourses));
});

test('verified about facts have one canonical source', () => {
	assert.equal(aboutProfile.position, 'Professor of Nonlinear Optimization');
	assert.equal(academicPositions[0]?.organization, aboutProfile.institution);
});
