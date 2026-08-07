import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { aboutProfile, reviewingActivity } from '../src/data/about.ts';

const astroConfig = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/SiteFooter.astro', import.meta.url), 'utf8');
const globalCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const homepageSections = readFileSync(new URL('../src/components/HomepageSections.astro', import.meta.url), 'utf8');

test('Astro has the verified canonical site origin and BaseLayout emits clean canonical URLs', () => {
	assert.match(astroConfig, /site:\s*['"]https:\/\/martin-schmidt\.science['"]/);
	assert.match(layout, /canonicalPath = Astro\.url\.pathname/);
	assert.match(layout, /new URL\(canonicalPath, Astro\.site\)/);
	assert.match(layout, /<link rel="canonical" href=\{canonicalUrl\.href\} \/>/);
});

test('homepage metadata is descriptive and derives identity from canonical About data', () => {
	assert.match(homepage, /import \{ aboutProfile \} from '\.\.\/data\/about'/);
	assert.match(homepage, /homepageTitle = `\$\{aboutProfile\.name\} — Nonlinear Optimization at \$\{aboutProfile\.institution\}`/);
	assert.match(homepage, /mathematical optimization with a focus on bilevel optimization/);
	assert.match(homepage, /<h1 id="page-title">\{aboutProfile\.name\}<\/h1>/);
	assert.doesNotMatch(homepage, /<h1[^>]*>Martin Schmidt<\/h1>|<p class="hero__affiliation">Trier University<\/p>/);
});

test('shared shell identity derives from About data and primary navigation is unchanged', () => {
	assert.match(layout, /import \{ aboutProfile \} from '\.\.\/data\/about'/);
	assert.match(footer, /import \{ aboutProfile \} from '\.\.\/data\/about'/);
	assert.doesNotMatch(layout, /<span>Martin Schmidt<\/span>|<small>Nonlinear Optimization<\/small>/);
	assert.doesNotMatch(footer, />Professor of Nonlinear Optimization<|>Trier University</);
	assert.deepEqual([...layout.matchAll(/\{ label: '([^']+)', href:/g)].map((match) => match[1]), [
		'Research',
		'Publications',
		'Group',
		'Software & Data',
		'Teaching',
		'About',
	]);
});

test('global editorial branding and personal voice remain distinct from factual titles', () => {
	assert.equal(aboutProfile.siteSubtitle, 'Mathematical Optimization');
	assert.equal(aboutProfile.position, 'Professor of Nonlinear Optimization');
	assert.match(layout, /<small>\{aboutProfile\.siteSubtitle\}<\/small>/);
	assert.match(footer, /\{aboutProfile\.siteSubtitle\}<br \/>\{aboutProfile\.institution\}/);
	assert.match(aboutProfile.biography, /^I am Professor of Nonlinear Optimization/);
	assert.match(reviewingActivity.summary, /^I have reviewed/);
	assert.match(homepageSections, /My academic career has included positions/);
});

test('decorative eyebrow labels and research-theme numbering are absent', () => {
	const sources = [
		'index', 'research', 'publications', 'group', 'software-data', 'teaching',
		'about', 'talks', 'projects', 'news', 'theses',
	].map((page) => readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8'));
	sources.push(homepageSections, readFileSync(new URL('../src/components/SelectedResearch.astro', import.meta.url), 'utf8'));
	for (const source of sources) assert.doesNotMatch(source, /class=["']eyebrow["']/);
	assert.doesNotMatch(globalCss, /\.eyebrow\s*\{/);
	assert.doesNotMatch(homepage, /theme__number|padStart/);
	assert.doesNotMatch(sources[1], /theme__number|application__number|padStart/);
});

test('homepage typography keeps the name restrained and group portraits readable', () => {
	assert.match(globalCss, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(2\.75rem, 8vw, 4\.75rem\)/s);
	assert.doesNotMatch(homepage, /<p[^>]*>\{aboutProfile\.position\}<\/p>/);
	assert.match(homepageSections, /grid-template-columns:\s*5rem minmax\(0, 1fr\)/);
	assert.match(homepageSections, /grid-template-columns:\s*4rem minmax\(0, 1fr\)/);
});
