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
		'Martin Schmidt is Professor of Nonlinear Optimization at Trier University. His research concerns bilevel, mixed-integer, nonlinear, robust, equilibrium, and network optimization.',
	contact: {
		email: undefined as string | undefined,
		address: undefined as string | undefined,
		institutionUrl: undefined as string | undefined,
	},
	profileLinks: [] as ProfileLink[],
	cvPath: undefined as string | undefined,
};

export const academicPositions: DatedItem[] = [
	{
		id: 'trier-professor',
		title: aboutProfile.position,
		organization: aboutProfile.institution,
	},
];

export const education: DatedItem[] = [];
export const awards: DatedItem[] = [];
export const professionalService: DatedItem[] = [];
export const invitedTalks: DatedItem[] = [];
