import assert from 'node:assert/strict';
import test from 'node:test';
import { bachelorTheses, masterTheses, theses } from '../src/data/theses.ts';

test('the supervised-thesis archive contains all 66 verified records', () => {
	assert.equal(theses.length, 66);
	assert.equal(bachelorTheses.length, 24);
	assert.equal(masterTheses.length, 42);
	assert.equal(new Set(theses.map((thesis) => thesis.id)).size, theses.length);
	for (const thesis of theses) {
		assert.ok(thesis.id.trim());
		assert.ok(thesis.title.trim());
		assert.ok(thesis.student.trim());
		assert.ok(Number.isInteger(thesis.year));
	}
});

test('all explicit Master institutions are retained and absent Bachelor institutions are not inferred', () => {
	assert.ok(masterTheses.every((thesis) => thesis.institution?.trim()));
	assert.ok(bachelorTheses.every((thesis) => thesis.institution === undefined));
});
