export type CurrentGroup = 'secretary' | 'postdoc' | 'phd';
export type AlumniGroup = 'former-phd' | 'former-postdoc';

export interface CurrentMembership {
	group: CurrentGroup;
	role: string;
	researchFocus?: string[];
}

export interface AlumniMembership {
	group: AlumniGroup;
	currentPosition?: string;
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
		current: { group: 'secretary', role: "Secretary's Office" },
	},
	{
		id: 'laura-sokolowski',
		name: 'Laura Sokolowski',
		current: { group: 'secretary', role: "Secretary's Office" },
	},
	{
		id: 'alois-duguet',
		name: 'Aloïs Duguet',
		current: {
			group: 'postdoc',
			role: 'Postdoctoral Researcher',
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
		current: {
			group: 'postdoc',
			role: 'Postdoctoral Researcher',
			researchFocus: ['bilevel optimization', 'mixed-integer optimization', 'nonlinear optimization'],
		},
		alumni: [{ group: 'former-phd' }],
	},
	{
		id: 'simon-stevens',
		name: 'Simon Stevens',
		current: {
			group: 'phd',
			role: 'Doctoral Researcher',
			researchFocus: ['bilevel optimization', 'optimization under decision-dependent uncertainty'],
		},
	},
	{
		id: 'ioana-molan',
		name: 'Ioana Molan',
		current: {
			group: 'phd',
			role: 'Doctoral Researcher',
			researchFocus: [
				'bilevel optimization',
				'optimization under uncertainty',
				'machine-learning approaches for uncertainty',
			],
		},
	},
	{ id: 'thomas-kleinert', name: 'Thomas Kleinert', alumni: [{ group: 'former-phd' }] },
	{ id: 'fraenk-plein', name: 'Fränk Plein', alumni: [{ group: 'former-phd' }] },
	{ id: 'julia-gruebel', name: 'Julia Grübel', alumni: [{ group: 'former-phd' }] },
	{ id: 'carina-moreira-costa', name: 'Carina Moreira Costa', alumni: [{ group: 'former-phd' }] },
	{ id: 'vanessa-krebs', name: 'Vanessa Krebs', alumni: [{ group: 'former-phd' }] },
	{ id: 'marius-roland', name: 'Marius Roland', alumni: [{ group: 'former-phd' }] },
	{ id: 'max-spaeth', name: 'Max Späth', alumni: [{ group: 'former-phd' }] },
	{ id: 'richard-krug', name: 'Richard Krug', alumni: [{ group: 'former-phd' }] },
	{ id: 'maria-eduarda-pinheiro', name: 'Maria Eduarda Pinheiro', alumni: [{ group: 'former-phd' }] },
	{ id: 'yasmine-beck', name: 'Yasmine Beck', alumni: [{ group: 'former-phd' }] },
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
