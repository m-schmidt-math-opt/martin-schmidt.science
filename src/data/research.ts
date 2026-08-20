export interface ResearchTheme {
	id: string;
	title: string;
	description: string;
}

export interface ResearchApplication {
	id: string;
	title: string;
	description: string;
}

export const researchThemes: ResearchTheme[] = [
	{
		id: 'bilevel-optimization',
		title: 'Bilevel Optimization',
		description: 'Mathematical models in which one optimization problem is constrained by the solution of another.',
	},
	{
		id: 'mixed-integer-nonlinear-optimization',
		title: 'Mixed-Integer & Nonlinear Optimization',
		description: 'Theory and algorithms for optimization problems that combine discrete decisions with nonlinear constraints and objectives.',
	},
	{
		id: 'robust-optimization-uncertainty',
		title: 'Optimization under Uncertainty',
		description: 'Models and algorithms for optimization under uncertain parameters, including robust and decision-dependent formulations.',
	},
	{
		id: 'equilibrium-problems-games',
		title: 'Equilibrium Problems & Games',
		description: 'Models and algorithms for interacting decision-makers, complementarity problems, and generalized Nash equilibrium problems.',
	},
	{
		id: 'network-optimization',
		title: 'Network Optimization',
		description: 'Optimization models and algorithms for (particularly nonlinear) flows in energy and infrastructure networks.',
	},
];

export const researchApplications: ResearchApplication[] = [
	{
		id: 'energy-systems',
		title: 'Energy Systems',
		description: 'Optimization models for the design and operation of energy systems with a particular focus on problems defined on networks.',
	},
	{
		id: 'energy-markets',
		title: 'Energy Markets',
		description: 'Equilibrium and bilevel models for market design, pricing, and strategic decisions in electricity and gas markets.',
	},
	{
		id: 'machine-learning-data-driven-optimization',
		title: 'Machine Learning & Data-Driven Optimization',
		description: 'Mixed-integer, bilevel, and robust optimization methods for learning, classification, clustering, and data-informed decisions.',
	},
	{
		id: 'infrastructure-networks',
		title: 'Infrastructure & Networks',
		description: 'Network optimization for planning and operating infrastructure, with a focus on energy transport networks.',
	},
];
