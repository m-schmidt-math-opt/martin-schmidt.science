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
const groupPage = readFileSync(new URL('../src/pages/group.astro', import.meta.url), 'utf8');
const softwareDataPage = readFileSync(new URL('../src/pages/software-data.astro', import.meta.url), 'utf8');
const aboutPage = readFileSync(new URL('../src/pages/about.astro', import.meta.url), 'utf8');

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

test('homepage research statement and institution presentation use the reviewed wording', () => {
	assert.match(homepage, /My research focuses on bilevel, mixed-integer, nonlinear, robust, equilibrium, and\s+network optimization, with applications in energy systems and markets as well as\s+machine learning and AI\./s);
	assert.match(homepage, /const homepageCountry = aboutProfile\.contact\.addressLines\.at\(-1\)/);
	assert.match(homepage, /<p class="hero__affiliation">\{homepageInstitution\}<\/p>/);
	assert.doesNotMatch(homepage, /structured optimization\s+problems, with a particular interest/);
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
	assert.equal([...homepageSections.matchAll(/grid-template-columns:\s*7rem minmax\(0, 1fr\)/g)].length, 2);
	assert.equal([...homepageSections.matchAll(/width:\s*7rem/g)].length, 2);
});

test('homepage uses the supplied local optimization figure without the obsolete geometry', () => {
	assert.match(homepage, /src="\/images\/homepage-optimization-abstract\.png"/);
	assert.match(homepage, /alt="Abstract optimization diagram"/);
	assert.doesNotMatch(homepage, /hero-geometry/);
	assert.doesNotMatch(globalCss, /hero-geometry/);
});

test('research section terminology and compact spacing follow the current editorial direction', () => {
	const researchPage = readFileSync(new URL('../src/pages/research.astro', import.meta.url), 'utf8');
	assert.match(homepage, /Core Research Topics/);
	assert.match(researchPage, /Core Research Topics/);
	assert.doesNotMatch(`${homepage}\n${researchPage}`, /Core Research Themes/);
	assert.match(globalCss, /--space-section-y:\s*clamp\(0\.75rem, 1\.5vw, 1\.25rem\)/);
});

test('internal page headings remain smaller than the homepage heading by design', () => {
	assert.match(globalCss, /--internal-h1-size:\s*clamp\(2\.25rem, 6vw, 4rem\)/);
	assert.match(globalCss, /main > header:not\(\.hero\) > h1#page-title\s*\{[^}]*font-size:\s*var\(--internal-h1-size\)/s);
	assert.match(globalCss, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(2\.75rem, 8vw, 4\.75rem\)/s);
	for (const page of ['research', 'group', 'software-data', 'teaching', 'about', 'talks', 'projects', 'news', 'theses']) {
		const source = readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8');
		assert.match(source, /h1\s*\{[^}]*font-size:\s*var\(--internal-h1-size\)/s);
	}
});

test('full group portraits are larger than the homepage portraits and alumni stay text-only', () => {
	assert.match(groupPage, /grid-template-columns:\s*10rem minmax\(0, 1fr\)/);
	assert.match(groupPage, /\.person-portrait\)\s*\{\s*width:\s*10rem/);
	assert.doesNotMatch(groupPage, /alumni[^\n]*<PersonPortrait|<PersonPortrait[^\n]*alumni/s);
});

test('Software and Data renders active resources once and retains the Archive', () => {
	assert.doesNotMatch(softwareDataPage, /Featured Resources|featuredResources/);
	assert.match(softwareDataPage, /Benchmark Libraries & Data/);
	assert.match(softwareDataPage, /title: 'Archive'/);
});

test('About contact columns derive address, email, and profile links from canonical profile data', () => {
	assert.match(aboutPage, /aboutProfile\.contact\.addressLines\.map/);
	assert.match(aboutPage, /mailto:\$\{aboutProfile\.contact\.email\}/);
	assert.match(aboutPage, /href=\{aboutProfile\.contact\.institutionUrl\}/);
	assert.match(aboutPage, /aboutProfile\.profileLinks\.map/);
	assert.doesNotMatch(aboutPage, /martin\.schmidt@uni-trier\.de|scholar\.google\.com|orcid\.org|bsky\.app|instagram\.com/);
});

test('Editorial Service renders date, journal, then role without changing canonical records', () => {
	assert.match(aboutPage, /editorialService\.map\(\(item\) => <li>\{item\.period && <time>\{item\.period\}<\/time>}<div>\{item\.organization && <h3>\{item\.organization}<\/h3>}<p>\{item\.title}<\/p><\/div><\/li>\)/);
});

test('major page headings have no decorative section numbers', () => {
	for (const page of ['about', 'group', 'projects', 'publications', 'software-data', 'talks', 'teaching', 'theses']) {
		const source = readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8');
		assert.doesNotMatch(source, /number:\s*['"]0|section\.number|padStart|aria-hidden=["']true["']>0\d/);
	}
	const resourceList = readFileSync(new URL('../src/components/ResourceList.astro', import.meta.url), 'utf8');
	assert.doesNotMatch(resourceList, /research-resource__number|padStart/);
});

test('footer profile links stay canonical and the shared shell provides one back-to-top control', () => {
	assert.match(footer, /aboutProfile\.profileLinks\.map/);
	for (const label of ['Google Scholar', 'ORCID', 'Bluesky', 'Instagram']) {
		assert.ok(aboutProfile.profileLinks.some((link) => link.label === label));
	}
	assert.doesNotMatch(footer, /https?:\/\/(?:scholar\.google|orcid\.org|bsky\.app|www\.instagram)/);
	assert.match(footer, /site-footer__identity[\s\S]*site-footer__profiles[\s\S]*site-footer__nav/);
	assert.equal((layout.match(/id="top"/g) ?? []).length, 1);
	assert.equal((layout.match(/class="back-to-top"/g) ?? []).length, 1);
	assert.match(layout, /href="#top" aria-label="Back to top"/);
});
