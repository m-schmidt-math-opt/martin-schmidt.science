export type ProjectStatus = 'current' | 'completed';

export interface Project {
	id: string;
	title: string;
	shortName?: string;
	status: ProjectStatus;
	fundingAgency?: string;
	startDate?: string;
	endDate?: string;
	description: string;
	externalUrl?: string;
	researchThemes?: string[];
	relatedPeople?: string[];
	relatedPublications?: string[];
	relatedResources?: string[];
}

export const projects: Project[] = [
	{
		id: 'symbi',
		title: 'Exploiting Symmetries for Faster Bilevel Optimization Algorithms',
		shortName: 'SymBi',
		status: 'current',
		fundingAgency: 'German Research Foundation (DFG) and Dutch Research Council (NWO)',
		startDate: '2026',
		description: 'Development of mathematical theory and algorithms for detecting and exploiting symmetries in bilevel optimization problems.',
		researchThemes: ['bilevel optimization', 'symmetry handling', 'algorithmic optimization'],
	},
	{
		id: 'a3g',
		title: 'Aggregative gemischt-ganzzahlige Gleichgewichtsprobleme: Existenz, Approximation und Algorithmen',
		shortName: 'A3G',
		status: 'current',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '10/2024',
		endDate: '09/2027',
		description: 'Study of the existence, approximation, and computation of equilibria in aggregative games with discrete strategy spaces.',
		externalUrl: 'https://www.uni-passau.de/forschung/forschungsprojekte/details/research_project/a3g',
		researchThemes: ['equilibrium problems', 'mixed-integer optimization', 'algorithmic game theory'],
	},
];
export const currentProjects = projects.filter((project) => project.status === 'current');
export const completedProjects = projects.filter((project) => project.status === 'completed');
