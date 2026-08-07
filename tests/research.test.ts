import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { projects } from '../src/data/projects.ts';
import { researchApplications, researchThemes } from '../src/data/research.ts';

const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const researchPage = readFileSync(new URL('../src/pages/research.astro', import.meta.url), 'utf8');
const projectsPage = readFileSync(new URL('../src/pages/projects.astro', import.meta.url), 'utf8');
const selectedResearch = readFileSync(new URL('../src/components/SelectedResearch.astro', import.meta.url), 'utf8');

test('canonical research themes have the exact intended order', () => {
	assert.equal(researchThemes.length, 5);
	assert.deepEqual(researchThemes.map((theme) => theme.title), [
		'Bilevel Optimization',
		'Mixed-Integer & Nonlinear Optimization',
		'Robust Optimization & Uncertainty',
		'Equilibrium Problems & Games',
		'Network Optimization',
	]);
	assert.equal(new Set(researchThemes.map((theme) => theme.id)).size, researchThemes.length);
	assert.ok(researchThemes.every((theme) => theme.description.trim().length > 0));
});

test('canonical research applications have the exact intended order', () => {
	assert.equal(researchApplications.length, 4);
	assert.deepEqual(researchApplications.map((application) => application.title), [
		'Energy Systems',
		'Energy Markets',
		'Machine Learning & Data-Driven Optimization',
		'Infrastructure & Networks',
	]);
	assert.equal(new Set(researchApplications.map((application) => application.id)).size, researchApplications.length);
	assert.ok(researchApplications.every((application) => application.description.trim().length > 0));
});

test('homepage and Research page render canonical research data', () => {
	assert.match(homepage, /import \{ researchThemes \} from '\.\.\/data\/research'/);
	assert.match(homepage, /researchThemes\.map/);
	assert.doesNotMatch(homepage, /const researchThemes\s*=/);
	assert.match(researchPage, /import \{ researchApplications, researchThemes \} from '\.\.\/data\/research'/);
	assert.match(researchPage, /researchThemes\.map/);
	assert.match(researchPage, /researchApplications\.map/);
});

test('Research page derives current projects and project pages expose unique canonical anchors', () => {
	assert.match(researchPage, /import \{ currentProjects \} from '\.\.\/data\/projects'/);
	assert.match(researchPage, /currentProjects\.map/);
	assert.doesNotMatch(researchPage, /\b(?:A3G|SymBi):/);
	assert.match(projectsPage, /<article id=\{project\.id\}>/);
	assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
});

test('Selected Research excludes the off-topic photography book', () => {
	assert.doesNotMatch(selectedResearch, /Kleinert_Schmidt:2022|Bessere Fotos/);
});
