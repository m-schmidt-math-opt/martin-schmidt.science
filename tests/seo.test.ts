import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const astroConfig = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const footer = readFileSync(new URL('../src/components/SiteFooter.astro', import.meta.url), 'utf8');

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
