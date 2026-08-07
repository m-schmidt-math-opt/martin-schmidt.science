import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { people, getAlumni, getCurrentPeople } from '../src/data/people.ts';

test('people have unique stable IDs', () => {
	assert.equal(new Set(people.map((person) => person.id)).size, people.length);
});

test('current portraits and former PhD dissertation metadata remain canonical people facts', () => {
	const current = people.filter((person) => person.current);
	assert.equal(current.length, 6);
	for (const person of current) {
		assert.ok(person.portrait?.src);
		assert.ok(existsSync(new URL(`../public${person.portrait!.src}`, import.meta.url)));
	}
	const formerPhds = getAlumni('former-phd');
	assert.ok(formerPhds.every((person) => person.alumniRecord.dissertation?.title && person.alumniRecord.dissertation.institution));
	assert.deepEqual(people.find((person) => person.id === 'thomas-kleinert')?.alumni?.[0]?.dissertation?.awards, ['GOR-Dissertationspreis 2022']);
	assert.deepEqual(people.find((person) => person.id === 'fraenk-plein')?.alumni?.[0]?.dissertation?.awards, ['Förderpreis 2022 of the Freundeskreis Trierer Universität e.V.']);
	assert.deepEqual(people.find((person) => person.id === 'yasmine-beck')?.alumni?.[0]?.dissertation?.awards, ['EURO Doctoral Dissertation Award 2025', 'GOR-Dissertationspreis']);
	const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
	assert.doesNotMatch(groupPage.slice(groupPage.indexOf('formerPhds.map'), groupPage.indexOf('formerPostdocs.map')), /PersonPortrait/);
});

test('current and alumni groups are derived from the canonical people records', () => {
	assert.equal(getCurrentPeople('secretary').length, 2);
	assert.equal(getCurrentPeople('postdoc').length, 2);
	assert.equal(getCurrentPeople('phd').length, 2);
	assert.equal(getAlumni('former-phd').length, 11);
	assert.equal(getAlumni('former-postdoc').length, 4);
	assert.equal(people.filter((person) => person.name === 'Andreas Horländer').length, 1);
});
