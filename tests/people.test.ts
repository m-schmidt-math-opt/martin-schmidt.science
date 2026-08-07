import assert from 'node:assert/strict';
import test from 'node:test';
import { people, getAlumni, getCurrentPeople } from '../src/data/people.ts';

test('people have unique stable IDs', () => {
	assert.equal(new Set(people.map((person) => person.id)).size, people.length);
});

test('current and alumni groups are derived from the canonical people records', () => {
	assert.equal(getCurrentPeople('secretary').length, 2);
	assert.equal(getCurrentPeople('postdoc').length, 2);
	assert.equal(getCurrentPeople('phd').length, 2);
	assert.equal(getAlumni('former-phd').length, 11);
	assert.equal(getAlumni('former-postdoc').length, 4);
	assert.equal(people.filter((person) => person.name === 'Andreas Horländer').length, 1);
});
