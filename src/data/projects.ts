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

// Add projects only after their scientific and funding details are verified.
export const projects: Project[] = [];
export const currentProjects = projects.filter((project) => project.status === 'current');
export const completedProjects = projects.filter((project) => project.status === 'completed');
