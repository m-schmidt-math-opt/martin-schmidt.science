import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { people, getAlumni, getCurrentPeople } from '../src/data/people.ts';

test('people have unique stable IDs', () => {
	assert.equal(people.length, 20);
	assert.equal(new Set(people.map((person) => person.id)).size, people.length);
});

test('specified alumni career updates and personal homepages remain canonical', () => {
	const carina = people.find((person) => person.id === 'carina-moreira-costa');
	assert.match(carina?.alumni?.[0]?.currentPosition ?? '', /Professor/);
	assert.match(carina?.alumni?.[0]?.currentPosition ?? '', /Department of Mathematics/);
	assert.match(carina?.alumni?.[0]?.currentPosition ?? '', /State University of Maringá/);
	assert.match(carina?.alumni?.[0]?.currentPosition ?? '', /Brazil/);

	const maria = people.find((person) => person.id === 'maria-eduarda-pinheiro');
	assert.match(maria?.alumni?.[0]?.currentPosition ?? '', /Professor/);
	assert.match(maria?.alumni?.[0]?.currentPosition ?? '', /Universidade Federal de Santa Catarina/);
	assert.match(maria?.alumni?.[0]?.currentPosition ?? '', /Brazil/);

	const yasmine = people.find((person) => person.id === 'yasmine-beck');
	assert.match(yasmine?.alumni?.[0]?.currentPosition ?? '', /Assistant Professor/);
	assert.match(yasmine?.alumni?.[0]?.currentPosition ?? '', /Department of Industrial Engineering and Innovation Sciences/);
	assert.match(yasmine?.alumni?.[0]?.currentPosition ?? '', /Eindhoven University of Technology/);
	assert.equal(yasmine?.homepage, 'https://yasminebeck.github.io/about/');

	const marius = people.find((person) => person.id === 'marius-roland');
	assert.match(marius?.alumni?.[0]?.currentPosition ?? '', /CRCN/);
	assert.match(marius?.alumni?.[0]?.currentPosition ?? '', /permanent research associate/);
	assert.match(marius?.alumni?.[0]?.currentPosition ?? '', /Inria Centre/);
	assert.match(marius?.alumni?.[0]?.currentPosition ?? '', /University of Lille/);
	assert.equal(marius?.homepage, 'https://mariusroland.gitlab.io');

	const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
	const formerPhdTemplate = groupPage.slice(groupPage.indexOf('formerPhds.map'), groupPage.indexOf('formerPostdocs.map'));
	assert.match(formerPhdTemplate, /person\.homepage \? <a href=\{person\.homepage\} \{\.\.\.externalLinkAttributes\(person\.homepage\)\}>\{person\.name\}<\/a> : person\.name/);
	assert.doesNotMatch(formerPhdTemplate, />Homepage<|>Website</);
});

test('requested research-focus cleanup and alumni homepages stay canonical', () => {
	assert.deepEqual(people.find((person) => person.id === 'alois-duguet')?.current?.researchFocus, [
		'approximation of nonlinear functions by piecewise linear functions',
		'Nash equilibria in mixed-integer programming games',
	]);
	assert.deepEqual(people.find((person) => person.id === 'andreas-horlaender')?.current?.researchFocus, ['bilevel optimization', 'mixed-integer optimization']);
	assert.equal(people.find((person) => person.id === 'marina-leal-palazon')?.homepage, 'https://www.umh.es/contenido/Estudios/:persona_259463/datos_en.html');
	assert.equal(people.find((person) => person.id === 'johannes-thuerauf')?.homepage, 'https://johannesthuerauf.gitlab.io');
	assert.equal(people.find((person) => person.id === 'henri-lefebvre')?.homepage, 'https://henrilefebvre.com');
	const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
	assert.match(groupPage, /person\.homepage.*externalLinkAttributes\(person\.homepage\)/s);
});

test('current portraits and former PhD dissertation metadata remain canonical people facts', () => {
	const current = people.filter((person) => person.current);
	assert.equal(current.length, 5);
	for (const person of current) {
		assert.ok(person.portrait?.src);
		assert.ok(existsSync(new URL(`../public${person.portrait!.src}`, import.meta.url)));
	}
	const formerPhds = getAlumni('former-phd');
	assert.ok(formerPhds.every((person) => person.alumniRecord.dissertation?.title));
	assert.deepEqual(people.find((person) => person.id === 'thomas-kleinert')?.alumni?.[0]?.dissertation?.awards, ['GOR-Dissertationspreis 2022']);
	assert.deepEqual(people.find((person) => person.id === 'fraenk-plein')?.alumni?.[0]?.dissertation?.awards, ['Förderpreis 2022 of the Freundeskreis Trierer Universität e.V.']);
	assert.deepEqual(people.find((person) => person.id === 'yasmine-beck')?.alumni?.[0]?.dissertation?.awards, ['EURO Doctoral Dissertation Award 2025', 'GOR-Dissertationspreis']);
	const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
	assert.doesNotMatch(groupPage.slice(groupPage.indexOf('formerPhds.map'), groupPage.indexOf('formerPostdocs.map')), /PersonPortrait/);
});

test('current and alumni groups are derived from the canonical people records', () => {
	assert.equal(getCurrentPeople('secretary').length, 2);
	assert.equal(getCurrentPeople('postdoc').length, 2);
	assert.equal(getCurrentPeople('phd').length, 1);
	assert.equal(getAlumni('former-phd').length, 12);
	assert.equal(getAlumni('former-postdoc').length, 4);
	assert.equal(people.filter((person) => person.name === 'Andreas Horländer').length, 1);
	const ioana = people.find((person) => person.id === 'ioana-molan');
	assert.equal(ioana?.current, undefined);
	assert.equal(ioana?.alumni?.filter((record) => record.group === 'former-phd').length, 1);
	assert.equal(ioana?.alumni?.[0]?.dissertation?.title, 'Inverse Optimization for Bilevel and Simultaneous Games using Sequential Learning');
	assert.equal(ioana?.alumni?.[0]?.dissertation?.institution, 'Trier University');
	assert.equal(ioana?.formerAffiliation, 'Research Training Group Algorithmic Optimization (ALOP)');
	assert.deepEqual(ioana?.researchFocus, ['bilevel optimization', 'optimization under uncertainty', 'machine-learning approaches for uncertainty']);
	assert.match(ioana?.biography ?? '', /bachelor’s degree in Business Mathematics/);
	assert.ok(getAlumni('former-phd').every((person) => person.alumniRecord.dissertation?.institution));
	const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
	const formerPhdTemplate = groupPage.slice(groupPage.indexOf('formerPhds.map'), groupPage.indexOf('formerPostdocs.map'));
	assert.doesNotMatch(formerPhdTemplate, /person\.(?:formerAffiliation|researchFocus|biography)/);
});

test('homepage groups every canonical current member with research staff first', () => {
	const homepageSections = readFileSync(new URL('../src/components/HomepageSections.astro', import.meta.url), 'utf8');
	const researchStaff = [...getCurrentPeople('postdoc'), ...getCurrentPeople('phd')];
	const supportStaff = getCurrentPeople('secretary');

	assert.deepEqual(researchStaff.map((person) => person.name), [
		'Aloïs Duguet',
		'Andreas Horländer',
		'Simon Stevens',
	]);
	assert.deepEqual(supportStaff.map((person) => person.name), [
		'Monika Thieme-Trapp',
		'Laura Sokolowski',
	]);
	assert.equal(researchStaff.length + supportStaff.length, people.filter((person) => person.current).length);
	assert.match(homepageSections, /getCurrentPeople\('postdoc'\).*getCurrentPeople\('phd'\)/s);
	assert.match(homepageSections, /getCurrentPeople\('secretary'\)/);
	assert.match(homepageSections, /researchStaff\.map/);
	assert.match(homepageSections, /supportStaff\.map/);
	assert.doesNotMatch(homepageSections, /name:\s*['\"](?:Aloïs Duguet|Monika Thieme-Trapp)/);
});
