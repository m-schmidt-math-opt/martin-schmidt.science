export interface DatedItem {
	id: string;
	period?: string;
	title: string;
	organization?: string;
	detail?: string;
	relatedPublicationKey?: string;
}

export interface ProfileLink {
	label: 'ORCID' | 'Google Scholar' | 'Bluesky' | 'Instagram' | string;
	href: string;
}

export const aboutProfile = {
	name: 'Martin Schmidt',
	position: 'Professor of Nonlinear Optimization',
	institution: 'Trier University',
	biography:
		'Martin Schmidt is Professor of Nonlinear Optimization at Trier University. His research develops theory and algorithms for bilevel, mixed-integer, nonlinear, robust, equilibrium, and network optimization, with applications including energy systems.',
	contact: {
		email: 'martin.schmidt@uni-trier.de',
		addressLines: ['Martin Schmidt', 'Trier University', 'Department of Mathematics', 'Universitätsring 15', '54296 Trier', 'Germany'],
		institutionUrl: 'https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-iv/faecher/mathematik/arbeitsgruppen/nichtlineare-optimierung/profil',
	},
	profileLinks: [
		{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=IiZJIdEAAAAJ' },
		{ label: 'ORCID', href: 'https://orcid.org/0000-0001-6208-5677' },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/schmaidt.bsky.social' },
		{ label: 'Instagram', href: 'https://www.instagram.com/schmaidt.de/' },
	] as ProfileLink[],
	portrait: { src: '/images/martin-schmidt.jpg', alt: 'Martin Schmidt' },
	cvPath: undefined as string | undefined,
};

export const academicPositions: DatedItem[] = [
	{
		id: 'trier-professor',
		period: 'Since 01/2019',
		title: 'Full Professor (W3) for Nonlinear Optimization',
		organization: aboutProfile.institution,
	},
	{
		id: 'trier-deputy-professor',
		period: '10/2018–12/2018',
		title: 'Deputy Professorship “Nonlinear Optimization”',
		organization: 'Trier University',
	},
	{
		id: 'fau-junior-professor',
		period: '04/2014–09/2018',
		title: 'Junior Professor (W1) for Optimization of Energy Systems',
		organization: 'FAU Erlangen-Nürnberg',
	},
	{
		id: 'fau-positive-evaluation',
		period: '03/2017',
		title: 'Positive Evaluation as Junior Professor',
		organization: 'FAU Erlangen-Nürnberg',
	},
	{
		id: 'hannover-postdoc',
		period: '02/2013–03/2014',
		title: 'Postdoctoral researcher',
		organization: 'Leibniz Universität Hannover',
	},
	{
		id: 'hannover-research-assistant',
		period: '06/2010–01/2013',
		title: 'Research assistant',
		organization: 'Leibniz Universität Hannover',
	},
	{
		id: 'zib-research-assistant',
		period: '11/2008–05/2010',
		title: 'Research assistant',
		organization: 'Zuse Institute Berlin',
		detail: 'Simultaneously guest researcher at Leibniz Universität Hannover',
	},
];

export const education: DatedItem[] = [
	{
		id: 'phd-mathematics',
		period: '01/2013',
		title: 'PhD in Mathematics',
		organization: 'Leibniz Universität Hannover',
	},
	{
		id: 'diplom-mathematics',
		period: '10/2008',
		title: 'Diplom in Mathematics',
		organization: 'Leibniz Universität Hannover',
		detail: 'Minor: Computer Science',
	},
];

export const awards: DatedItem[] = [
	{ id: 'euro-ejor-2025', period: '2025', title: 'EURO Best EJOR Paper Award 2025 – Review Category', relatedPublicationKey: 'Beck_et_al:2023a' },
	{ id: 'editor-distinction-2025', period: '2025', title: 'Editor of Distinction Awards 2025 – Editorial Contribution Award 2025', organization: 'Optimization Letters' },
	{ id: 'optimization-letters-2021', period: '2021', title: 'Optimization Letters Best Paper Award 2021', relatedPublicationKey: 'Kleinert_et_al:2021a' },
	{ id: 'marguerite-frank-2021', period: '2021', title: 'Marguerite Frank Award for the Best EJCO Paper in 2021', relatedPublicationKey: 'Kleinert_et_al:2021c' },
	{ id: 'mmor-2021', period: '2021', title: 'MMOR Best Paper Award 2021', relatedPublicationKey: 'Plein_et_al:2021' },
	{ id: 'roadef-euro-2020', period: '2020', title: 'First Prize, Scientific Category', organization: 'ROADEF/EURO Challenge 2020', detail: 'Grid-operation-based outage maintenance planning · With Diego Cattaruzza, Martine Labbé, Matteo Petris, and Marius Roland' },
	{ id: 'rosenbrock-2020', period: '2020', title: 'Howard Rosenbrock Prize 2020', detail: 'For the best paper published in Optimization and Engineering in 2020', relatedPublicationKey: 'Labbe_et_al:2020' },
	{ id: 'euro-practice-2016', period: '2016', title: 'EURO Excellence in Practice Award' },
	{ id: 'hannover-faculty-award-2009', period: '2009', title: 'Award for Excellent Student Performance', organization: 'Faculty of Mathematics and Physics, Leibniz Universität Hannover' },
];

export const academicLeadership: DatedItem[] = [
	{ id: 'alop-speaker', period: '01/2025–12/2025', title: 'Speaker', organization: 'Research Training Group Algorithmic Optimization (ALOP), Trier University' },
	{ id: 'department-speaker', period: '03/2023–09/2024', title: 'Speaker of the Department of Mathematics', organization: 'Trier University' },
	{ id: 'alop-vice-speaker', period: '10/2020–12/2024', title: 'Vice Speaker', organization: 'Research Training Group Algorithmic Optimization (ALOP), Trier University' },
	{ id: 'bilevel-society-founding-committee', period: 'Until 12/2024', title: 'Member of the Founding Committee', organization: 'Bilevel Optimization Society' },
];

export const affiliationsAndFellowships: DatedItem[] = [
	{ id: 'iuma-committee', period: 'Since 12/2024', title: 'Member of the International Scientific Committee', organization: 'Instituto Universitario de Investigación de Matemáticas y Aplicaciones, Universidad de Zaragoza' },
	{ id: 'trr154-fellow', period: 'Since 07/2022', title: 'Fellow', organization: 'SFB/TRR 154' },
	{ id: 'encn-fellow', period: 'Since 12/2018', title: 'Fellow', organization: 'Energie Campus Nürnberg' },
	{ id: 'encn-board', period: '01/2017–12/2018', title: 'Member of the Extended Scientific Board', organization: 'Energie Campus Nürnberg' },
	{ id: 'fau-secondary-member', period: '06/2016–12/2018', title: 'Secondary Member', organization: 'Faculty of Business, Economics, and Law, Friedrich-Alexander-Universität Erlangen-Nürnberg' },
];

export const editorialService: DatedItem[] = [
	{ id: 'ejor-board', period: 'Since 01/2026', title: 'Editorial Board Member', organization: 'European Journal of Operational Research' },
	{ id: 'jogo-board', period: 'Since 10/2025', title: 'Editorial Board Member', organization: 'Journal of Global Optimization' },
	{ id: 'jota-board', period: 'Since 06/2022', title: 'Editorial Board Member', organization: 'Journal of Optimization Theory and Applications' },
	{ id: 'optl-board', period: 'Since 05/2022', title: 'Editorial Board Member', organization: 'Optimization Letters' },
	{ id: 'ors-associate-editor', period: 'Since 2021', title: 'Associate Editor', organization: 'OR Spectrum' },
	{ id: 'ejco-associate-editor', period: 'Since 2021', title: 'Associate Editor', organization: 'EURO Journal on Computational Optimization' },
	{ id: 'mpc-technical-editor', period: 'Since 2011', title: 'Technical Editor', organization: 'Mathematical Programming Computation' },
];

export const reviewingActivity = {
	summary: 'Martin Schmidt has reviewed for more than 40 journals in mathematical optimization, operations research, applied mathematics, and energy systems.',
	selectedJournals: [
		'Mathematical Programming A',
		'Mathematical Programming B',
		'Mathematical Programming C',
		'SIAM Journal on Optimization',
		'European Journal of Operational Research',
		'INFORMS Journal on Computing',
	],
};
