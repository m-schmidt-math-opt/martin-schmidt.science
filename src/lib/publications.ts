import bibliography from '../data/publications.bib?raw';

export type PublicationType =
	| 'journal'
	| 'preprint'
	| 'book'
	| 'chapter'
	| 'conference'
	| 'thesis'
	| 'review'
	| 'other';

export interface PublicationLink {
	label: string;
	href: string;
}

export interface PublicationMetadataItem {
	label: string;
	href?: string;
}

export interface Publication {
	id: string;
	type: PublicationType;
	bibtexType: string;
	typeLabel: string;
	classificationResolved: boolean;
	title: string;
	authors: string;
	venue?: string;
	year?: number;
	month?: number;
	date?: string;
	metadata: PublicationMetadataItem[];
	links: PublicationLink[];
}

interface RawEntry {
	key: string;
	type: string;
	fields: Record<string, string>;
}

export const publicationWarnings: string[] = [];

function fail(message: string): never {
	throw new Error(`[publications.bib] ${message}`);
}

function readBalanced(source: string, start: number, open: string, close: string) {
	if (open === close) {
		let escaped = false;
		for (let index = start + 1; index < source.length; index += 1) {
			if (!escaped && source[index] === close) return { value: source.slice(start + 1, index), end: index + 1 };
			escaped = !escaped && source[index] === '\\';
			if (source[index] !== '\\') escaped = false;
		}
		fail(`Unclosed ${open} starting near character ${start}.`);
	}
	let depth = 0;
	let escaped = false;
	for (let index = start; index < source.length; index += 1) {
		const character = source[index];
		if (escaped) {
			escaped = false;
			continue;
		}
		if (character === '\\') {
			escaped = true;
			continue;
		}
		if (character === open) depth += 1;
		if (character === close && --depth === 0) {
			return { value: source.slice(start + 1, index), end: index + 1 };
		}
	}
	fail(`Unclosed ${open} starting near character ${start}.`);
}

function parseFields(body: string, key: string): Record<string, string> {
	const fields: Record<string, string> = {};
	let index = body.indexOf(',') + 1;
	while (index > 0 && index < body.length) {
		while (/[\s,]/.test(body[index] ?? '')) index += 1;
		if (index >= body.length) break;
		const nameMatch = /^[A-Za-z][A-Za-z0-9_-]*/.exec(body.slice(index));
		if (!nameMatch) fail(`Cannot read a field in "${key}" near "${body.slice(index, index + 30)}".`);
		const originalName = nameMatch[0];
		const name = originalName.toLowerCase();
		index += originalName.length;
		while (/\s/.test(body[index] ?? '')) index += 1;
		if (body[index] !== '=') fail(`Expected "=" after ${originalName} in "${key}".`);
		index += 1;
		while (/\s/.test(body[index] ?? '')) index += 1;
		let value = '';
		if (body[index] === '{') {
			const parsed = readBalanced(body, index, '{', '}');
			value = parsed.value;
			index = parsed.end;
		} else if (body[index] === '"') {
			const parsed = readBalanced(body, index, '"', '"');
			value = parsed.value;
			index = parsed.end;
		} else {
			const end = body.indexOf(',', index);
			value = body.slice(index, end < 0 ? body.length : end).trim();
			index = end < 0 ? body.length : end;
		}
		if (name in fields && fields[name].trim() !== value.trim()) {
			fail(`Conflicting case-insensitive field "${name}" in "${key}".`);
		}
		fields[name] = value.trim();
	}
	return fields;
}

function parseBibTeX(source: string): RawEntry[] {
	const entries: RawEntry[] = [];
	const keys = new Set<string>();
	let index = 0;
	while ((index = source.indexOf('@', index)) >= 0) {
		const header = /^@([A-Za-z]+)\s*([({])/.exec(source.slice(index));
		if (!header) fail(`Malformed entry near character ${index}.`);
		const type = header[1].toLowerCase();
		const open = header[2];
		const bodyStart = index + header[0].length - 1;
		const parsed = readBalanced(source, bodyStart, open, open === '{' ? '}' : ')');
		index = parsed.end;
		if (type === 'comment' || type === 'preamble' || type === 'string') continue;
		const comma = parsed.value.indexOf(',');
		if (comma < 1) fail(`Entry near character ${bodyStart} has no citation key.`);
		const key = parsed.value.slice(0, comma).trim();
		if (keys.has(key)) fail(`Duplicate citation key "${key}".`);
		keys.add(key);
		entries.push({ key, type, fields: parseFields(parsed.value, key) });
	}
	return entries;
}

const accents: Record<string, string> = {
	'\\"a': 'ä', '\\"o': 'ö', '\\"u': 'ü', '\\"A': 'Ä', '\\"O': 'Ö', '\\"U': 'Ü',
	"\\'a": 'á', "\\'e": 'é', "\\'i": 'í', "\\'o": 'ó', "\\'u": 'ú',
	'\\`a': 'à', '\\`e': 'è', '\\`i': 'ì', '\\`o': 'ò', '\\`u': 'ù',
	'\\~a': 'ã', '\\~n': 'ñ', '\\c c': 'ç', '\\ss': 'ß',
};

function latexToText(value = ''): string {
	let text = value;
	text = text.replace(/\$\\Gamma\$/g, 'Γ');
	text = text.replace(/\$([^$]+)\$/g, '$1');
	text = text.replace(/\\url\{([^}]*)\}/g, '$1').replace(/\\enquote\{([^}]*)\}/g, '“$1”');
	text = text.replace(/\\(?:textit|emph|textbf|mathrm|operatorname)\{([^{}]*)\}/g, '$1');
	text = text.replace(/\\(["'`~^=.uvHck])\s*\{?([A-Za-z])\}?/g, (match, mark, letter) => {
		const key = `\\${mark}${letter}`;
		return accents[key] ?? letter.normalize('NFC');
	});
	for (const [command, replacement] of Object.entries(accents)) text = text.replaceAll(command, replacement);
	return text
		.replace(/\{([“”])\}/g, '$1')
		.replace(/[{}]/g, '')
		.replace(/\\&/g, '&')
		.replace(/\\_/g, '_')
		.replace(/---/g, '—')
		.replace(/--/g, '–')
		.replace(/~+/g, ' ')
		.replace(/\\([#$%])/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

function formatName(name: string): string {
	const clean = latexToText(name.trim());
	const comma = clean.indexOf(',');
	return comma < 0 ? clean : `${clean.slice(comma + 1).trim()} ${clean.slice(0, comma).trim()}`;
}

function formatAuthors(author = ''): string {
	return author.split(/\s+and\s+/i).map(formatName).join(', ');
}

function classify(entry: RawEntry): PublicationType {
	if (entry.key === 'Schmidt:2020') return 'review';
	if (entry.type === 'article') return 'journal';
	if (entry.type === 'book') return 'book';
	if (['inbook', 'incollection'].includes(entry.type)) return 'chapter';
	if (['inproceedings', 'conference'].includes(entry.type)) return 'conference';
	if (['phdthesis', 'mastersthesis', 'thesis'].includes(entry.type)) return 'thesis';
	if (['techreport', 'report'].includes(entry.type)) return 'preprint';
	return 'other';
}

export const publicationTypeLabels: Record<PublicationType, string> = {
	journal: 'Journal Article',
	conference: 'Conference Proceedings Paper',
	chapter: 'Book Chapter',
	book: 'Book',
	preprint: 'Preprint',
	thesis: 'Thesis',
	review: 'Review',
	other: 'Other',
};

function cleanDoi(value: string): string {
	return value.trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '');
}

function normalizeUrl(value: string, field: string): string | undefined {
	let url = latexToText(value).trim();
	if (!url) return;
	if (/^10\.\d{4,9}\//i.test(url)) url = `https://doi.org/${url}`;
	else if (!/^https?:\/\//i.test(url)) {
		publicationWarnings.push(`Skipped non-URL value in ${field}: ${url}`);
		return;
	}
	return url.replace(/^http:\/\/(arxiv\.org|www\.optimization-online\.org|optimization-online\.org|ssrn\.com)/i, 'https://$1');
}

function linkLabel(field: string, href: string): string {
	const target = `${field} ${href}`.toLowerCase();
	if (field.includes('code') || field.includes('github')) return 'Code';
	if (field.includes('data')) return 'Data';
	if (field.includes('source')) return 'Source files';
	if (target.includes('arxiv')) return 'arXiv';
	if (target.includes('optimization-online')) return 'Optimization Online';
	if (target.includes('opus')) return 'OPUS';
	if (target.includes('ssrn')) return 'SSRN';
	if (target.includes('medrxiv')) return 'medRxiv';
	if (target.includes('inria') || target.includes('hal.')) return 'HAL';
	if (field.includes('preprint')) return 'Preprint';
	if (/\.pdf(?:$|\?)/i.test(href)) return 'PDF';
	return 'Online';
}

function collectLinks(fields: Record<string, string>): PublicationLink[] {
	const links: PublicationLink[] = [];
	const seen = new Set<string>();
	if (fields.doi) {
		const doi = cleanDoi(fields.doi);
		const href = `https://doi.org/${doi}`;
		seen.add(href.toLowerCase());
		links.push({ label: 'DOI', href });
	}
	for (const [field, value] of Object.entries(fields)) {
		if (!(field === 'url' || field === 'xurl' || field.includes('url'))) continue;
		const href = normalizeUrl(value, field);
		if (!href || seen.has(href.toLowerCase())) continue;
		seen.add(href.toLowerCase());
		links.push({ label: linkLabel(field, href), href });
	}
	return links;
}

const bibMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function parseMonth(value = ''): number | undefined {
	const clean = latexToText(value).trim().toLowerCase();
	if (/^(?:0?[1-9]|1[0-2])$/.test(clean)) return Number(clean);
	const index = bibMonths.findIndex((month) => clean === month || clean.startsWith(month));
	return index >= 0 ? index + 1 : undefined;
}

function normalize(entry: RawEntry): Publication {
	const { fields } = entry;
	const date = latexToText(fields.date);
	const yearValue = latexToText(fields.year) || date.slice(0, 4);
	const year = /^\d{4}$/.test(yearValue) ? Number(yearValue) : undefined;
	const dateMonth = /^\d{4}-(\d{2})/.exec(date)?.[1];
	const month = parseMonth(fields.month) ?? parseMonth(dateMonth);
	if (!fields.title) publicationWarnings.push(`${entry.key}: missing title`);
	if (!fields.author) publicationWarnings.push(`${entry.key}: missing author`);
	if (!year) publicationWarnings.push(`${entry.key}: missing or invalid year/date`);
	const venue = fields.journal ?? fields.journaltitle ?? fields.booktitle ?? fields.publisher ?? fields.institution ?? fields.school;
	const type = classify(entry);
	const metadata: PublicationMetadataItem[] = [];
	const addMetadata = (label: string, value?: string, href?: string) => {
		if (value?.trim()) metadata.push({ label: `${label}${latexToText(value)}`, href });
	};
	if (type === 'journal') {
		addMetadata('', fields.journal ?? fields.journaltitle);
		addMetadata('Vol. ', fields.volume);
		addMetadata('No. ', fields.number);
		addMetadata('pp. ', fields.pages);
	} else if (type === 'conference' || type === 'chapter') {
		addMetadata('', fields.booktitle);
		addMetadata('pp. ', fields.pages);
		addMetadata('', fields.publisher);
	} else if (type === 'book') {
		addMetadata('', fields.publisher);
		addMetadata('Series: ', fields.series);
		addMetadata('Edition: ', fields.edition);
	} else if (type === 'preprint') {
		addMetadata('', fields.institution);
		addMetadata('', fields.type);
		addMetadata('No. ', fields.number);
	} else if (type === 'thesis') {
		addMetadata('', fields.school ?? fields.institution);
		addMetadata('', fields.type);
	}
	if (fields.doi) {
		const doi = cleanDoi(fields.doi);
		metadata.push({ label: 'DOI', href: `https://doi.org/${doi}` });
	}
	return {
		id: entry.key,
		type,
		bibtexType: entry.type,
		typeLabel: publicationTypeLabels[type],
		classificationResolved: entry.key === 'Schmidt:2020' || ['article', 'inproceedings', 'conference', 'incollection', 'inbook', 'book', 'report', 'techreport', 'phdthesis', 'mastersthesis', 'thesis'].includes(entry.type),
		title: latexToText(fields.title) || '[Untitled publication]',
		authors: formatAuthors(fields.author) || '[Author not recorded]',
		venue: venue ? latexToText(venue) : undefined,
		year,
		month,
		date: date || undefined,
		metadata,
		links: collectLinks(fields),
	};
}

export const publications = parseBibTeX(bibliography)
	.map(normalize)
	.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)
		|| (b.month ?? 0) - (a.month ?? 0)
		|| (b.date ?? '').localeCompare(a.date ?? '')
		|| a.title.localeCompare(b.title));

export const publicationTypes: PublicationType[] = ['journal', 'preprint', 'book', 'chapter', 'conference', 'thesis', 'review', 'other'];

export function publicationsByKeys(keys: readonly string[]): Publication[] {
	const byKey = new Map(publications.map((publication) => [publication.id, publication]));
	return keys.map((key) => byKey.get(key) ?? fail(`Selected publication key "${key}" does not exist.`));
}
