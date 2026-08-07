export type CurrentGroup = 'secretary' | 'postdoc' | 'phd';
export type AlumniGroup = 'former-phd' | 'former-postdoc';

export interface CurrentMembership {
	group: CurrentGroup;
	role: string;
	researchFocus?: string[];
	startDate?: string;
	affiliation?: string;
	biography?: string;
}

export interface AlumniMembership {
	group: AlumniGroup;
	currentPosition?: string;
	dissertation?: {
		title: string;
		institution: string;
		coSupervisor?: string;
		awards?: string[];
	};
}

export interface Person {
	id: string;
	name: string;
	portrait?: {
		src: string;
		alt: string;
	};
	email?: string;
	homepage?: string;
	current?: CurrentMembership;
	alumni?: AlumniMembership[];
}

// Canonical source for current and former group membership. Contact and portrait
// fields are intentionally omitted until verified information/assets are available.
export const people: Person[] = [
	{
		id: 'monika-thieme-trapp',
		name: 'Monika Thieme-Trapp',
		portrait: { src: '/images/group/monika-thieme-trapp.jpg', alt: 'Monika Thieme-Trapp' },
		email: 'trapp@uni-trier.de',
		current: { group: 'secretary', role: "Secretary's Office" },
	},
	{
		id: 'laura-sokolowski',
		name: 'Laura Sokolowski',
		portrait: { src: '/images/group/laura-sokolowski.jpg', alt: 'Laura Sokolowski' },
		email: 'sokolowski@uni-trier.de',
		current: { group: 'secretary', role: "Secretary's Office" },
	},
	{
		id: 'alois-duguet',
		name: 'Aloïs Duguet',
		portrait: { src: '/images/group/alois-duguet.jpg', alt: 'Aloïs Duguet' },
		email: 'duguet@uni-trier.de',
		current: {
			group: 'postdoc',
			role: 'Postdoctoral Researcher',
			biography: 'Aloïs received his master’s degree in Operational Research from Université Paul Sabatier in Toulouse in 2020 and completed a PhD in Computer Science at LAAS-CNRS in Toulouse in 2023 under the supervision of Sandra U. Ngueveu.',
			researchFocus: [
				'approximation of nonlinear functions by piecewise linear functions',
				'Nash equilibria in mixed-integer programming games',
				'branching methods',
			],
		},
	},
	{
		id: 'andreas-horlaender',
		name: 'Andreas Horländer',
		portrait: { src: '/images/group/andreas-horlaender.jpg', alt: 'Andreas Horländer' },
		email: 'horlaender@uni-trier.de',
		current: {
			group: 'postdoc',
			role: 'Postdoctoral Researcher',
			startDate: '03/2026',
			biography: 'Andreas studied Applied Mathematics at Trier University, received his master’s degree in 2022, and completed his PhD in 2025 in the Research Training Group Algorithmic Optimization (ALOP) under the supervision of Martin Schmidt. He subsequently worked as a researcher at UTN Nuremberg within CRC/TRR 154.',
			researchFocus: ['bilevel optimization', 'mixed-integer optimization', 'nonlinear optimization'],
		},
		alumni: [{ group: 'former-phd', dissertation: { title: 'Algorithms and Complexity Theory for Bilevel Problems with Nonlinear Lower Levels', institution: 'Trier University' } }],
	},
	{
		id: 'simon-stevens',
		name: 'Simon Stevens',
		portrait: { src: '/images/group/simon-stevens.jpg', alt: 'Simon Stevens' },
		email: 'stevens@uni-trier.de',
		current: {
			group: 'phd',
			role: 'Doctoral Researcher',
			startDate: '10/2024',
			biography: 'Simon studied at Trier University, earning a bachelor’s degree in Business Mathematics in September 2022 and a master’s degree in Mathematics in September 2024.',
			researchFocus: ['bilevel optimization', 'optimization under decision-dependent uncertainty'],
		},
	},
	{
		id: 'ioana-molan',
		name: 'Ioana Molan',
		portrait: { src: '/images/group/ioana-molan.jpg', alt: 'Ioana Molan' },
		email: 'molan@uni-trier.de',
		current: {
			group: 'phd',
			role: 'Doctoral Researcher',
			affiliation: 'Research Training Group Algorithmic Optimization (ALOP)',
			biography: 'Ioana studied at Trier University, receiving a bachelor’s degree in Business Mathematics in September 2019 and a master’s degree in Applied Mathematics in April 2022.',
			researchFocus: [
				'bilevel optimization',
				'optimization under uncertainty',
				'machine-learning approaches for uncertainty',
			],
		},
	},
	{ id: 'thomas-kleinert', name: 'Thomas Kleinert', alumni: [{ group: 'former-phd', dissertation: { title: 'Algorithms for Mixed-Integer Bilevel Problems with Convex Followers', institution: 'Friedrich-Alexander-Universität Erlangen-Nürnberg', awards: ['GOR-Dissertationspreis 2022'] } }] },
	{ id: 'fraenk-plein', name: 'Fränk Plein', alumni: [{ group: 'former-phd', dissertation: { title: 'When Bilevel Optimization Meets Gas Networks: Feasibility of Bookings in the European Entry-Exit Gas Market Computational Complexity Results and Bilevel Optimization Approaches', institution: 'Trier University', awards: ['Förderpreis 2022 of the Freundeskreis Trierer Universität e.V.'] } }] },
	{ id: 'julia-gruebel', name: 'Julia Grübel', alumni: [{ group: 'former-phd', dissertation: { title: 'Existence, Uniqueness, and Algorithms for Equilibria in Competitive Energy Markets', institution: 'Trier University' } }] },
	{ id: 'carina-moreira-costa', name: 'Carina Moreira Costa', alumni: [{ group: 'former-phd', dissertation: { title: 'Computational Techniques for Minimum Sum-of-Squares Clustering, Cardinality-Constrained Optimization, and Robust Clustering Problems', institution: 'Trier University', coSupervisor: 'Jan Pablo Burgard' } }] },
	{ id: 'vanessa-krebs', name: 'Vanessa Krebs', alumni: [{ group: 'former-phd', dissertation: { title: 'Well-posedness of Deterministic and Uncertain Linear Complementarity Problems with an Application to Electricity Markets', institution: 'Friedrich-Alexander-Universität Erlangen-Nürnberg' } }] },
	{ id: 'marius-roland', name: 'Marius Roland', alumni: [{ group: 'former-phd', dissertation: { title: 'Adaptive Refinement Algorithms for Optimization Problems in Energy Transport Networks', institution: 'Trier University' } }] },
	{ id: 'max-spaeth', name: 'Max Späth', alumni: [{ group: 'former-phd', dissertation: { title: 'Spatial Ramsey-Type Equilibrium Modeling: Existence Theory, Numerical Methods, and Case Studies', institution: 'Trier University' } }] },
	{ id: 'richard-krug', name: 'Richard Krug', alumni: [{ group: 'former-phd', dissertation: { title: 'Decomposition Methods for Time-Dependent Mixed-Integer Nonlinear Optimization Problems on Graphs', institution: 'Friedrich-Alexander-Universität Erlangen-Nürnberg' } }] },
	{ id: 'maria-eduarda-pinheiro', name: 'Maria Eduarda Pinheiro', alumni: [{ group: 'former-phd', dissertation: { title: 'Mixed-Integer Optimization for Semi-Supervised Learning with Cardinality Constraints: Support Vector Machines, Classification Trees, and Random Forests', institution: 'Trier University', coSupervisor: 'Jan Pablo Burgard' } }] },
	{ id: 'yasmine-beck', name: 'Yasmine Beck', alumni: [{ group: 'former-phd', dissertation: { title: 'Mixed-Integer Optimization Techniques for Robust Bilevel Problems with Here-and-Now Followers', institution: 'Trier University', awards: ['EURO Doctoral Dissertation Award 2025', 'GOR-Dissertationspreis'] } }] },
	{
		id: 'marina-leal-palazon',
		name: 'Marina Leal Palazon',
		alumni: [{ group: 'former-postdoc', currentPosition: 'Professor at Universidad Miguel Hernández, Spain' }],
	},
	{
		id: 'dennis-kreber',
		name: 'Dennis Kreber',
		alumni: [{ group: 'former-postdoc', currentPosition: 'Strangeworks' }],
	},
	{
		id: 'johannes-thuerauf',
		name: 'Johannes Thürauf',
		alumni: [{ group: 'former-postdoc', currentPosition: 'Professor at the University of Technology Nuremberg' }],
	},
	{
		id: 'henri-lefebvre',
		name: 'Henri Lefebvre',
		alumni: [{ group: 'former-postdoc', currentPosition: 'Permanent CNRS researcher hosted by LIRMM, Montpellier, France' }],
	},
];

export const currentPeople = people.filter((person) => person.current);

export function getCurrentPeople(group: CurrentGroup): Person[] {
	return people.filter((person) => person.current?.group === group);
}

export function getAlumni(group: AlumniGroup): Array<Person & { alumniRecord: AlumniMembership }> {
	return people.flatMap((person) => {
		const alumniRecord = person.alumni?.find((membership) => membership.group === group);
		return alumniRecord ? [{ ...person, alumniRecord }] : [];
	});
}

export function initialsFor(person: Person): string {
	return person.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toLocaleUpperCase();
}

export function focusLine(person: Person): string | undefined {
	const topics = person.current?.researchFocus;
	if (!topics?.length) return;
	return topics.map((topic, index) => index === 0 ? topic[0].toLocaleUpperCase() + topic.slice(1) : topic).join(' · ');
}
