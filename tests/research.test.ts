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
		'Optimization und Uncertainty',
		'Equilibrium Problems & Games',
		'Network Optimization',
	]);
	assert.equal(new Set(researchThemes.map((theme) => theme.id)).size, researchThemes.length);
	assert.ok(researchThemes.every((theme) => theme.description.trim().length > 0));
	assert.equal(researchThemes.find((theme) => theme.id === 'equilibrium-problems-games')?.description, 'Models and algorithms for interacting decision-makers, complementarity problems, and generalized Nash equilibrium problems.');
	assert.equal(researchThemes.find((theme) => theme.id === 'network-optimization')?.description, 'Optimization models and algorithms for (particularly nonlinear) flows in energy and infrastructure networks.');
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
	assert.equal(researchApplications.find((application) => application.id === 'energy-systems')?.description, 'Optimization models for the design and operation of energy systems with a particular focus on problems defined on networks.');
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

test('Selected Research replaces implicit nonlinearities with the canonical adjustable robust network-design paper', () => {
	assert.match(selectedResearch, /Thuerauf_et_al:2025/);
	assert.doesNotMatch(selectedResearch, /Schmidt_et_al:2022/);
	assert.match(readFileSync(new URL('../src/data/publications.bib', import.meta.url), 'utf8'), /@article\{Schmidt_et_al:2022,[\s\S]*The Cost of Not Knowing Enough/);
});

test('homepage Selected Research uses the A3G display title and canonical No Free Lunch publication', () => {
	const a3g = projects.find((project) => project.id === 'a3g');
	const symbi = projects.find((project) => project.id === 'symbi');
	const bibliography = readFileSync(new URL('../src/data/publications.bib', import.meta.url), 'utf8');
	assert.equal(a3g?.title, 'A3G: Aggregative gemischt-ganzzahlige Gleichgewichtsprobleme: Existenz, Approximation und Algorithmen');
	assert.equal(a3g?.displayTitle, 'A3G: Aggregative Mixed-Integer Equilibrium Problems: Existence, Approximation, and Algorithms');
	assert.equal(symbi?.title, 'SymBi: Exploiting Symmetries for Faster Bilevel Optimization Algorithms');
	assert.match(bibliography, /@article\{Kleinert_et_al:2020,[\s\S]*There's No Free Lunch: On the Hardness of Choosing a Correct Big-M in Bilevel Optimization/);
	assert.match(selectedResearch, /a3g\.displayTitle \?\? a3g\.title/);
	assert.match(selectedResearch, /Kleinert_et_al:2020/);
	assert.match(selectedResearch, /noFreeLunch\.title/);
	assert.match(selectedResearch, /noFreeLunchLink\.href/);
	assert.doesNotMatch(selectedResearch, /project\.id === 'symbi'|symbi\.title/);
});

test('Research page omits Figure 1 while its source image remains unchanged', () => {
	const image = readFileSync(new URL('../public/images/research-gnep-nep-figure1.png', import.meta.url));
	assert.equal(image.readUInt32BE(16), 2200);
	assert.equal(image.readUInt32BE(20), 1086);
	assert.equal(image[25], 6);
	assert.doesNotMatch(researchPage, /research-gnep-nep-figure1\.png|research-intro__figure/);
	assert.doesNotMatch(researchPage, /<figcaption/);
});
