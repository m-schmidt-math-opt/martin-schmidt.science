export type ResourceKind = 'software' | 'benchmark-data';
export type ResourceStatus = 'active' | 'archived';
export type ResourceLinkKind = 'repository' | 'documentation' | 'project' | 'publication' | 'external';

export interface ResourceLink {
	kind: ResourceLinkKind;
	label: string;
	href: string;
}

export interface ResearchResource {
	id: string;
	name: string;
	kind: ResourceKind;
	status: ResourceStatus;
	featured?: boolean;
	description: string;
	descriptionPending?: boolean;
	links: ResourceLink[];
}

// Canonical resource metadata. Add verified links here rather than in page components.
export const resources: ResearchResource[] = [
	{
		id: 'bobilib',
		name: 'BOBILib',
		kind: 'software',
		status: 'active',
		featured: true,
		description: 'A software library for modeling and solving bilevel optimization problems.',
		links: [],
	},
	{
		id: 'gaslib',
		name: 'GasLib',
		kind: 'benchmark-data',
		status: 'active',
		featured: true,
		description: 'A collection of gas network data sets for optimization and algorithmic research.',
		links: [],
	},
	{
		id: 'lamatto',
		name: 'LaMaTTO++',
		kind: 'software',
		status: 'active',
		featured: true,
		description: 'Description pending verification.',
		descriptionPending: true,
		links: [],
	},
];

export const featuredResources = resources.filter((resource) => resource.featured && resource.status === 'active');
export const softwareResources = resources.filter((resource) => resource.kind === 'software' && resource.status === 'active');
export const dataResources = resources.filter((resource) => resource.kind === 'benchmark-data' && resource.status === 'active');
export const archivedResources = resources.filter((resource) => resource.status === 'archived');
