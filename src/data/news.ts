export const newsCategories = ['Publication', 'Talk', 'Project', 'Award', 'Book', 'Software', 'Other'] as const;
export type NewsCategory = typeof newsCategories[number];
export type HomepageState = 'automatic' | 'pinned' | 'excluded';

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

// Initial entries use exact dates and facts from the canonical talks dataset.
export const news: NewsItem[] = [
	{
		id: 'household-assignment-paper-published',
		date: '2026-08',
		category: 'Publication',
		title: 'Computational Methods for the Household Assignment Problem published',
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

export function selectHomepageNews(items: NewsItem[], limit = 4): NewsItem[] {
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
