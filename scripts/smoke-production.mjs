const productionOrigin = 'https://martin-schmidt.science';
const routes = [
	'/',
	'/about/',
	'/group/',
	'/news/',
	'/projects/',
	'/publications/',
	'/research/',
	'/reviewing/',
	'/software-data/',
	'/talks/',
	'/teaching/',
	'/theses/',
];
const assets = [
	'/images/homepage-optimization-abstract.png',
	'/images/research-gnep-nep-figure1.png',
	'/images/martin-schmidt.jpg',
	'/images/group/alois-duguet.jpg',
];

const failures = [];
const warnings = [];

async function request(path, options = {}) {
	const response = await fetch(new URL(path, productionOrigin), options);
	if (!response.ok) failures.push(`${path}: expected success, received ${response.status}`);
	return response;
}

for (const route of routes) {
	const response = await request(route);
	const html = await response.text();
	const expectedCanonical = new URL(route, productionOrigin).href;
	const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
	if (canonicalMatch?.[1] !== expectedCanonical) {
		failures.push(`${route}: expected canonical ${expectedCanonical}, found ${canonicalMatch?.[1] ?? 'none'}`);
	}
	for (const forbidden of ['localhost', 'm-schmidt-math-opt.github.io']) {
		if (html.includes(forbidden)) failures.push(`${route}: contains forbidden production reference ${forbidden}`);
	}
}

await request('/robots.txt');
const sitemapIndex = await request('/sitemap-index.xml');
if (sitemapIndex.ok) {
	const sitemap = await sitemapIndex.text();
	const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
	if (sitemapPaths.length === 0) failures.push('/sitemap-index.xml: contains no child sitemap');
	for (const sitemapUrl of sitemapPaths) await request(sitemapUrl);
}
for (const asset of assets) await request(asset);

const httpResponse = await fetch('http://martin-schmidt.science/', { redirect: 'manual' });
const httpLocation = httpResponse.headers.get('location');
if (httpResponse.status < 300 || httpResponse.status >= 400 || !httpLocation?.startsWith('https://')) {
	warnings.push(`HTTP redirect: expected redirect to HTTPS, received ${httpResponse.status}${httpLocation ? ` to ${httpLocation}` : ''}`);
}

for (const warning of warnings) console.warn(`WARNING: ${warning}`);
if (failures.length > 0) {
	for (const failure of failures) console.error(`FAIL: ${failure}`);
	process.exit(1);
} else {
	console.log(`PASS: ${routes.length} routes, robots.txt, sitemap, and ${assets.length} representative assets`);
	process.exit(0);
}
