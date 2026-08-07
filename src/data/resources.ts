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
		kind: 'benchmark-data',
		status: 'active',
		featured: true,
		description: 'An open library of bilevel optimization benchmark instances in a standardized format.',
		links: [{ kind: 'project', label: 'BOBILib website', href: 'https://bobilib.org/' }],
	},
	{
		id: 'gaslib',
		name: 'GasLib',
		kind: 'benchmark-data',
		status: 'active',
		featured: true,
		description: 'A collection of gas network data sets for optimization and algorithmic research.',
		links: [{ kind: 'project', label: 'GasLib website', href: 'https://gaslib.zib.de/' }],
	},
	{
		id: 'lamatto',
		name: 'LaMaTTO++',
		kind: 'software',
		status: 'archived',
		description: 'A framework developed in the ForNe project for modeling and solving mixed-integer nonlinear optimization problems on networks.',
		links: [],
	},
	{
		id: 'robust-electricity-market-equilibria',
		name: 'Robust Electricity Market Equilibrium Models',
		kind: 'benchmark-data',
		status: 'active',
		description: 'QP and QCQP model instances accompanying research on strictly and Γ-robust electricity market equilibria.',
		links: [{ kind: 'repository', label: 'GitHub repository', href: 'https://github.com/m-schmidt-math-opt/robust-electricity-market-equilibria' }],
	},
	{
		id: 'diophantine-bit-commitment',
		name: 'Diophantine Bit Commitment Implementation',
		kind: 'software',
		status: 'archived',
		description: 'A C++ implementation of a bit commitment scheme based on inhomogeneous simultaneous Diophantine approximation.',
		links: [{ kind: 'publication', label: 'Related publication', href: 'https://doi.org/10.1007/978-3-642-21969-6_15' }],
	},
];

export const featuredResources = resources.filter((resource) => resource.featured && resource.status === 'active');
export const softwareResources = resources.filter((resource) => resource.kind === 'software' && resource.status === 'active');
export const dataResources = resources.filter((resource) => resource.kind === 'benchmark-data' && resource.status === 'active');
export const archivedResources = resources.filter((resource) => resource.status === 'archived');
