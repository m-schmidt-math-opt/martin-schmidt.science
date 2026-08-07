import { talks } from './talks.ts';

export interface DatedItem {
	id: string;
	period?: string;
	title: string;
	organization?: string;
	detail?: string;
}

export interface ProfileLink {
	label: 'ORCID' | 'Google Scholar' | 'GitHub' | 'DBLP' | 'LinkedIn' | string;
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
		address: 'Department of Mathematics, Trier University, Universitätsring 15, 54296 Trier, Germany · Office E20 · Phone +49 651 201 3481',
		institutionUrl: 'https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-iv/faecher/mathematik/arbeitsgruppen/nichtlineare-optimierung/profil',
	},
	profileLinks: [] as ProfileLink[],
	cvPath: undefined as string | undefined,
};

export const academicPositions: DatedItem[] = [
	{
		id: 'trier-professor',
		period: 'Since 01/2019',
		title: aboutProfile.position,
		organization: aboutProfile.institution,
		detail: 'Full professor (W3)',
	},
	{
		id: 'trier-deputy-professor',
		period: '10/2018–12/2018',
		title: 'Deputy Professorship in Nonlinear Optimization',
		organization: 'Trier University',
	},
	{
		id: 'fau-junior-professor',
		period: '04/2014–09/2018',
		title: 'Junior Professor (W1) of Optimization of Energy Systems',
		organization: 'Friedrich-Alexander-Universität Erlangen-Nürnberg',
	},
	{
		id: 'hannover-postdoc',
		period: '02/2013–03/2014',
		title: 'Postdoctoral Researcher',
		organization: 'Institute of Applied Mathematics, Leibniz Universität Hannover',
	},
	{
		id: 'hannover-research-assistant',
		period: '06/2010–01/2013',
		title: 'Research Assistant',
		organization: 'Institute of Applied Mathematics, Leibniz Universität Hannover',
	},
	{
		id: 'zib-research-assistant',
		period: '11/2008–05/2010',
		title: 'Research Assistant',
		organization: 'Department Optimization, Zuse Institute Berlin',
		detail: 'Concurrently guest researcher at Leibniz Universität Hannover',
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
		detail: 'Minor in computer science',
	},
];

export const awards: DatedItem[] = [
	{ id: 'euro-ejor-2025', period: '2025', title: 'EURO Best EJOR Paper Award – Review Category', detail: 'For “A Survey on Bilevel Optimization Under Uncertainty”, with Yasmine Beck and Ivana Ljubić' },
	{ id: 'editor-distinction-2025', period: '2025', title: 'Editor of Distinction – Editorial Contribution Award', organization: 'Optimization Letters' },
	{ id: 'optimization-letters-2021', period: '2021', title: 'Best Paper Award', organization: 'Optimization Letters', detail: 'For “Closing the Gap in Linear Bilevel Optimization: A New Valid Primal-Dual Inequality”' },
	{ id: 'marguerite-frank-2021', period: '2021', title: 'Marguerite Frank Award', organization: 'EURO Journal on Computational Optimization', detail: 'For “A Survey on Mixed-Integer Programming Techniques in Bilevel Optimization”' },
	{ id: 'mmor-2021', period: '2021', title: 'Best Paper Award', organization: 'Mathematical Methods of Operations Research', detail: 'For “A Bilevel Optimization Approach to Decide the Feasibility of Bookings in the European Gas Market”' },
	{ id: 'roadef-euro-2020', period: '2020', title: 'First Prize, Scientific Category', organization: 'ROADEF/EURO Challenge 2020' },
	{ id: 'rosenbrock-2020', period: '2020', title: 'Howard Rosenbrock Prize', organization: 'Optimization and Engineering' },
	{ id: 'euro-practice-2016', period: '2016', title: 'EURO Excellence in Practice Award' },
	{ id: 'hannover-faculty-award-2009', period: '2009', title: 'Faculty Award for Excellent Academic Performance', organization: 'Faculty of Mathematics and Physics, Leibniz Universität Hannover' },
];

export const professionalService: DatedItem[] = [
	{ id: 'ejor-board', period: 'Since 01/2026', title: 'Editorial Board Member', organization: 'European Journal of Operational Research' },
	{ id: 'jogo-board', period: 'Since 10/2025', title: 'Editorial Board Member', organization: 'Journal of Global Optimization' },
	{ id: 'iuma-committee', period: 'Since 12/2024', title: 'Member, International Scientific Committee', organization: 'Instituto Universitario de Investigación de Matemáticas y Aplicaciones, Universidad de Zaragoza' },
	{ id: 'jota-board', period: 'Since 06/2022', title: 'Editorial Board Member', organization: 'Journal of Optimization Theory and Applications' },
	{ id: 'optl-board', period: 'Since 05/2022', title: 'Editorial Board Member', organization: 'Optimization Letters' },
	{ id: 'ors-associate-editor', period: 'Since 2021', title: 'Associate Editor', organization: 'OR Spectrum' },
	{ id: 'ejco-associate-editor', period: 'Since 2021', title: 'Associate Editor', organization: 'EURO Journal on Computational Optimization' },
	{ id: 'mpc-technical-editor', period: 'Since 2011', title: 'Technical Editor', organization: 'Mathematical Programming Computation' },
];

const talkLocation = (talk: (typeof talks)[number]) => [talk.city, talk.country].filter(Boolean).join(', ');

export const invitedTalks: DatedItem[] = talks
	.filter((talk) => talk.types.some((type) => type === 'plenary' || type === 'keynote'))
	.slice(0, 4)
	.map((talk) => ({
		id: talk.id,
		period: talk.date.display ?? talk.date.start,
		title: talk.title,
		organization: [talk.eventName, talkLocation(talk)].filter(Boolean).join(' · '),
		detail: talk.types.includes('plenary') ? 'Plenary talk' : 'Keynote talk',
}));
