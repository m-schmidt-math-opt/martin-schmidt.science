export interface TeachingLink {
	label: string;
	href: string;
	kind: 'official' | 'moodle' | 'materials' | 'external';
}

export interface CurrentCourse {
	id: string;
	title: string;
	term: string;
	links: TeachingLink[];
}

export interface PortfolioSubject {
	id: string;
	title: string;
	description?: string;
}

export interface TeachingResource {
	id: string;
	title: string;
	description?: string;
	links: TeachingLink[];
}

export interface PastCourse {
	id: string;
	title: string;
	term: string;
	sortDate: string;
	links: TeachingLink[];
}

export const currentTeaching: CurrentCourse[] = [
	{ id: 'linear-algebra-winter-2026', title: 'Linear Algebra', term: 'Winter Term 2026/2027', links: [] },
	{ id: 'linear-optimization-winter-2026', title: 'Linear Optimization', term: 'Winter Term 2026/2027', links: [] },
	{ id: 'nonlinear-optimization-summer-2026', title: 'Nonlinear Optimization', term: 'Summer Term 2026', links: [] },
	{ id: 'bilevel-optimization-2-summer-2026', title: 'Bilevel Optimization 2', term: 'Summer Term 2026', links: [] },
];
export const teachingPortfolio: PortfolioSubject[] = [
	{ id: 'linear-optimization', title: 'Linear Optimization (Lineare Optimierung)', description: 'Lecture' },
	{ id: 'linear-combinatorial-optimization', title: 'Linear and Combinatorial Optimization (Lineare und kombinatorische Optimierung)', description: 'Lecture' },
	{ id: 'nonlinear-optimization', title: 'Nonlinear Optimization (Nichtlineare Optimierung)', description: 'Lecture' },
	{ id: 'numerical-optimization', title: 'Numerical Optimization (Numerische Optimierung)', description: 'Lecture' },
	{ id: 'robust-optimization', title: 'Robust Optimization (Robuste Optimierung)', description: 'Lecture' },
	{ id: 'bilevel-optimization', title: 'Bilevel Optimization (Bilevel-Optimierung)', description: 'Lecture and seminar' },
	{ id: 'beyond-optimization', title: 'Beyond Optimization: A Primer on Complementarity Problems, Variational Inequalities, and Game Theory', description: 'Lecture' },
	{ id: 'interior-point-methods', title: 'Interior-Point Methods for Linear and Nonlinear Optimization', description: 'Lecture' },
	{ id: 'minlp-introduction', title: 'Introduction to Mixed-Integer Nonlinear Optimization', description: 'Lecture' },
	{ id: 'optimization-equilibrium-constraints', title: 'Mathematical Optimization with Equilibrium Constraints', description: 'Lecture' },
	{ id: 'linear-complementarity', title: 'Linear Complementarity Problems (Lineare Komplementaritätsprobleme)', description: 'Lecture and seminar' },
	{ id: 'optimization-industry-economy', title: 'Optimization in Industry and Economy', description: 'Lecture' },
	{ id: 'utility-networks', title: 'Optimization of Utility Networks (Optimierung von Versorgungsnetzen)', description: 'Lecture' },
	{ id: 'linear-algebra', title: 'Linear Algebra (Lineare Algebra)', description: 'Lecture' },
	{ id: 'elements-analysis', title: 'Elements of Analysis 1 & 2 (Elemente der Analysis 1 & 2)', description: 'Lecture' },
	{ id: 'mathematics-economists', title: 'Advanced Mathematics for Economists (Mathematik für Ökonomen)', description: 'Lecture' },
	{ id: 'convex-minlp-seminar', title: 'Convex Mixed-Integer Nonlinear Optimization', description: 'Seminar' },
	{ id: 'optimization-project-seminar-master', title: 'Optimization Project Seminar', description: 'Master’s-level seminar' },
	{ id: 'optimization-project-seminar-bachelor', title: 'Optimization Project Seminar', description: 'Bachelor’s-level seminar' },
	{ id: 'discrete-optimization-seminar', title: 'Discrete Optimization', description: 'Seminar' },
	{ id: 'minlp-seminar', title: 'Mixed-Integer Nonlinear Optimization', description: 'Seminar' },
	{ id: 'variational-inequalities-seminar', title: 'Variational Inequalities', description: 'Seminar' },
];

export const teachingResources: TeachingResource[] = [
	{
		id: 'lecture-cycle',
		title: 'Optimization Lecture Cycle',
		description: 'Overview of the recurring seven-lecture optimization cycle and its prerequisites.',
		links: [{ label: 'Lecture cycle (PDF)', href: '/files/optimization-lecture-cycle.pdf', kind: 'materials' }],
	},
	{
		id: 'bilevel-book',
		title: 'Linear and Mixed-Integer Bilevel Optimization: Theory and Algorithms',
		description: 'Freely available pre-publication version of the book by Yasmine Beck, Ivana Ljubić, and Martin Schmidt.',
		links: [{ label: 'Pre-publication PDF', href: 'https://yasminebeck.github.io/files/bilevel-optimization-cup.pdf', kind: 'materials' }],
	},
	{
		id: 'utility-networks-materials',
		title: 'Optimization of Utility Networks',
		description: 'Book and accompanying source repository developed with Lars Schewe from the lecture material.',
		links: [
			{ label: 'Book', href: 'https://doi.org/10.1007/978-3-662-58539-9', kind: 'external' },
			{ label: 'Source repository', href: 'https://github.com/m-schmidt-math-opt/Optimierung-von-Versorgungsnetzwerken/', kind: 'materials' },
		],
	},
	{
		id: 'how-to-give-a-talk',
		title: '(My personal opinions on) how to give a talk',
		description: 'Personal notes on how to give a talk, last updated in July 2022.',
		links: [{ label: 'Read the PDF', href: '/files/how-to-give-a-talk.pdf', kind: 'materials' }],
	},
];

export const pastCourses: PastCourse[] = [
	{ id: 'bilevel-optimization-ws-2025', title: 'Bilevel Optimization', term: 'Winter term 2025/2026', sortDate: '2025-10', links: [] },
	{ id: 'numerical-optimization-2024-2025', title: 'Numerical Optimization', term: 'Summer terms 2024 and 2025', sortDate: '2025-04', links: [] },
	{ id: 'nonlinear-optimization-2019-2025', title: 'Nonlinear Optimization', term: 'Summer terms 2019–2025', sortDate: '2025-04', links: [] },
	{ id: 'beyond-optimization-2023', title: 'Beyond Optimization: A Primer on Complementarity Problems, Variational Inequalities, and Game Theory', term: 'Winter terms 2021/2022 and 2023/2024', sortDate: '2023-10', links: [] },
	{ id: 'linear-algebra-2018', title: 'Linear Algebra', term: 'Winter term 2018/2019', sortDate: '2018-10', links: [] },
	{ id: 'utility-networks-2017', title: 'Optimization of Utility Networks', term: 'Winter term 2015/2016 and summer term 2017', sortDate: '2017-04', links: [] },
	{ id: 'linear-complementarity-2017', title: 'Linear Complementarity Problems', term: 'Summer term 2017', sortDate: '2017-04', links: [] },
	{ id: 'linear-combinatorial-optimization-2016', title: 'Linear and Combinatorial Optimization', term: 'Winter term 2016/2017', sortDate: '2016-10', links: [] },
	{ id: 'robust-optimization-2016', title: 'Robust Optimization', term: 'Summer term 2016', sortDate: '2016-04', links: [] },
	{ id: 'optimization-equilibrium-constraints-2015', title: 'Mathematical Optimization with Equilibrium Constraints', term: 'Summer term 2015', sortDate: '2015-04', links: [] },
	{ id: 'interior-point-methods-2013-2014', title: 'Interior-Point Methods for Linear and Nonlinear Optimization', term: 'Summer terms 2013 and 2014', sortDate: '2014-04', links: [] },
];
