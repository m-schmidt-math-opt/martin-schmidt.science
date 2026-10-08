import { aboutProfile } from './about.ts';
import type { Publication } from '../lib/publications.ts';

export const newsCategories = ['Publication', 'Talk', 'Project', 'Award', 'Book', 'Software', 'Other'] as const;
export type NewsCategory = typeof newsCategories[number];
export type HomepageState = 'automatic' | 'pinned' | 'excluded';
export const homepageNewsLimit = 5;

export interface NewsItem {
	id: string;
	date: string;
	category: NewsCategory;
	title: string;
	text: string;
	link?: { label: string; href: string };
	publicationKey?: string;
	homepage: HomepageState;
}

export function formatNewsDate(date: string, month: 'short' | 'long' = 'long'): string {
	const hasDay = /^\d{4}-\d{2}-\d{2}$/.test(date);
	const value = new Date(`${date}${hasDay ? '' : '-01'}T00:00:00Z`);
	return new Intl.DateTimeFormat('en-GB', {
		...(hasDay && { day: 'numeric' }),
		month,
		year: 'numeric',
		timeZone: 'UTC',
	}).format(value);
}

export function formatNewsTitle(item: NewsItem, publications: readonly Publication[]): string {
	if (!item.publicationKey) return item.title;
	const publication = publications.find((publication) => publication.id === item.publicationKey);
	if (!publication) throw new Error(`Unknown news publication key: ${item.publicationKey}`);
	const coauthors = publication.authors.split(', ').filter((name) => name !== aboutProfile.name);
	const details: Record<string, string | undefined> = {
		title: publication.title,
		coauthors: new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(coauthors),
		venue: publication.venue,
	};
	return item.title.replace(/\{(title|coauthors|venue)\}/g, (_, field: string) => {
		const value = details[field];
		if (!value) throw new Error(`Missing ${field} for news publication: ${item.publicationKey}`);
		return value;
	});
}

// Initial entries use exact dates and facts from the canonical talks dataset.
export const news: NewsItem[] = [
	{
		id: 'henrion-schmidt-paper-accepted',
		date: '2026-10-08',
		category: 'Publication',
		title: 'Our paper “{title}” (jointly with {coauthors}) has been accepted at {venue}.',
		text: 'You can find the preprint via the publication entry.',
		publicationKey: 'Henrion_Schmidt:2026',
		homepage: 'automatic',
	},
	{
		id: 'lefebvre-et-al-paper-accepted',
		date: '2026-09-30',
		category: 'Publication',
		title: 'Our paper “{title}” (jointly with {coauthors}) has been accepted at {venue}.',
		text: 'You can find the preprint via the publication entry.',
		publicationKey: 'Lefebvre_et_al:2026',
		homepage: 'automatic',
	},
	{
		id: 'gregow-2027-save-the-date',
		date: '2026-08-14',
		category: 'Other',
		title: 'Save the date: GreGOW, the next edition of the Global Optimization Workshop will be held in Grenoble from the 7th to the 10th of September 2027.',
		text: 'Further information is available on the workshop website.',
		link: { label: 'GreGOW 2027', href: 'https://ghost-team.gitlabpages.inria.fr/events/gregow27/' },
		homepage: 'automatic',
	},
	{
		id: 'household-assignment-paper-published',
		date: '2026-08',
		category: 'Publication',
		title: 'Our paper "Computational Methods for the Household Assignment Problem" is now published in MMOR',
		text: 'The paper is now published.',
		publicationKey: 'Friedrich_et_al:2026',
		homepage: 'automatic',
	},
	{
		id: 'icbo-2026-bobilib-talk',
		date: '2026-08-03',
		category: 'Talk',
		title: 'BOBILib at ICBO 2026',
		text: 'A talk on the BOBILib benchmark instance library at ICBO 2026 in Pittsburgh.',
		link: { label: 'Browse talks', href: '/talks/' },
		homepage: 'automatic',
	},
	{
		id: 'europt-2026-plenary',
		date: '2026-07-08',
		category: 'Talk',
		title: 'Plenary talk at EUROPT 2026',
		text: '“Nonlinear Flows Meet Bilevel and Robust Optimization” in Linz.',
		link: { label: 'Browse talks', href: '/talks/' },
		homepage: 'pinned',
	},
	{
		id: 'europt-2026-summer-school',
		date: '2026-07-06',
		category: 'Talk',
		title: 'Invited lectures at the EUROPT summer school',
		text: 'Two days of lectures introducing bilevel optimization and selected new results.',
		link: { label: 'Browse talks', href: '/talks/' },
		homepage: 'automatic',
	},
	{
		id: 'tu-clausthal-2026-colloquium',
		date: '2026-06-17',
		category: 'Talk',
		title: 'Invited colloquium talk at TU Clausthal',
		text: 'A talk on coupling constraints in linear bilevel optimization.',
		link: { label: 'Browse talks', href: '/talks/' },
		homepage: 'automatic',
	},
	{
		id: 'vame-2026-talk',
		date: '2026-03-10',
		category: 'Talk',
		title: 'Invited talk at VAME 2026',
		text: 'A talk on a one-extra-player reduction of GNEPs to NEPs in Rancagua.',
		link: { label: 'Browse talks', href: '/talks/' },
		homepage: 'excluded',
	},
];

export function selectHomepageNews(items: NewsItem[], limit = homepageNewsLimit): NewsItem[] {
	const eligible = items.filter((item) => item.homepage !== 'excluded').sort((a, b) => b.date.localeCompare(a.date));
	const pinned = eligible.filter((item) => item.homepage === 'pinned');
	const selected = pinned.slice(0, limit);
	const remaining = eligible.filter((item) => item.homepage !== 'pinned');
	const usedCategories = new Set(selected.map((item) => item.category));

	for (const item of remaining) {
		if (selected.length >= limit) break;
		if (!usedCategories.has(item.category)) {
			selected.push(item);
			usedCategories.add(item.category);
		}
	}
	for (const item of remaining) {
		if (selected.length >= limit) break;
		if (!selected.includes(item)) selected.push(item);
	}
	return selected.sort((a, b) => b.date.localeCompare(a.date));
}

export const homepageNews = selectHomepageNews(news);
