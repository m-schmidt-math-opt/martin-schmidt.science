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

// Teaching records remain empty until course titles, terms, and links are verified.
export const currentTeaching: CurrentCourse[] = [];
export const teachingPortfolio: PortfolioSubject[] = [];
export const teachingResources: TeachingResource[] = [];
export const pastCourses: PastCourse[] = [];
