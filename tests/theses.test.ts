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

test('all source-explicit Master institutions and user-verified Bachelor institutions are retained', () => {
	assert.ok(masterTheses.every((thesis) => thesis.institution?.trim()));
	assert.equal(bachelorTheses.find((thesis) => thesis.id === 'bachelor-brachtendorf-2022')?.institution, 'Trier University');
	assert.equal(bachelorTheses.find((thesis) => thesis.id === 'bachelor-jordan-2020')?.institution, 'FAU Erlangen-Nuremberg');
	assert.ok(bachelorTheses.every((thesis) => thesis.institution.trim()));
	assert.equal(theses.filter((thesis) => thesis.institution).length, 66);
});
