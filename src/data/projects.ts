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
	partners?: string[];
	role?: string;
	programme?: string;
	reviewNote?: string;
}

export const projects: Project[] = [
	{
		id: 'symbi',
		title: 'SymBi: Exploiting Symmetries for Faster Bilevel Optimization Algorithms',
		shortName: 'SymBi',
		status: 'current',
		fundingAgency: 'German Research Foundation (DFG) and Dutch Research Council (NWO)',
		startDate: '2026',
		description: 'Development of mathematical theory and algorithms for detecting and exploiting symmetries in bilevel optimization problems.',
		researchThemes: ['bilevel optimization', 'symmetry handling', 'algorithmic optimization'],
		partners: ['Eindhoven University of Technology (Christopher Hojny)'],
	},
	{
		id: 'a3g',
		title: 'A3G: Aggregative gemischt-ganzzahlige Gleichgewichtsprobleme: Existenz, Approximation und Algorithmen',
		shortName: 'A3G',
		status: 'current',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '10/2024',
		endDate: '09/2027',
		description: 'Study of the existence, approximation, and computation of equilibria in aggregative games with discrete strategy spaces.',
		externalUrl: 'https://www.uni-passau.de/forschung/forschungsprojekte/details/research_project/a3g',
		researchThemes: ['equilibrium problems', 'mixed-integer optimization', 'algorithmic game theory'],
		partners: ['Universität Passau (Tobias Harks)'],
	},
	{
		id: 'alop',
		title: 'ALOP: Algorithmic Optimization',
		shortName: 'ALOP',
		status: 'completed',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '10/2018',
		description: 'Research training group on Algorithmic Optimization at Trier University.',
		role: 'Principal investigator since 10/2018; Vice Speaker 10/2020–12/2024; Speaker 01/2025–12/2025',
		externalUrl: 'https://alop.uni-trier.de/',
	},
	{
		id: 'rodes',
		title: 'RODES: Robuste Optimierung für das Design von Energiesystemen',
		shortName: 'RODES',
		status: 'completed',
		fundingAgency: 'BMBF',
		startDate: '2022',
		endDate: '2025',
		description: 'Research project on robust optimization for the design of energy systems.',
		partners: ['TU Darmstadt (Marc Pfetsch, Stefan Ulbrich, Florian Steinke)'],
	},
	{
		id: 'cclcp',
		title: 'CCLCP: Chance-Constrained Linear Complementarity Problems',
		shortName: 'CCLCP',
		status: 'completed',
		fundingAgency: 'PGMO',
		startDate: '2024',
		endDate: '2025',
		description: 'Research project on chance-constrained linear complementarity problems.',
		partners: ['WIAS Berlin (René Henrion)'],
	},
	{
		id: 'eifer-adaptive-ph-systems',
		title: 'Adaptive Verfahren zur Optimierung gekoppelter pH-Systeme',
		status: 'completed',
		fundingAgency: 'BMBF',
		startDate: '01/2018',
		endDate: '12/2021',
		description: 'Subproject on adaptive methods for optimizing coupled pH systems.',
		programme: 'Energieeffizienz durch intelligente Fernwärmenetze (EiFer)',
		partners: ['Universität Trier', 'TU Berlin', 'Fraunhofer-Institut für Techno- und Wirtschaftsmathematik (ITWM)'],
	},
	{
		id: 'minoa',
		title: 'MINOA: Mixed-Integer Nonlinear Optimization Algorithms',
		shortName: 'MINOA',
		status: 'completed',
		fundingAgency: 'EU (Marie-Curie European Training Network)',
		startDate: '01/2018',
		endDate: '12/2021',
		description: 'European training network on mixed-integer nonlinear optimization algorithms.',
		partners: ['Frauke Liers'],
	},
	{
		id: 'energiemarktdesign',
		title: 'Energiemarktdesign',
		status: 'completed',
		fundingAgency: 'Bavarian State Government',
		startDate: '01/2017',
		description: 'Subproject on energy market design.',
		programme: 'Energie Campus Nürnberg',
		partners: ['Veronika Grimm', 'Roland Ismer', 'Frauke Liers', 'Alexander Martin'],
		reviewNote: 'The old site lists the project as completed but provides no end date.',
	},
	{
		id: 'trr154-a05',
		title: 'Decomposition methods for mixed-integer optimal control',
		status: 'completed',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '07/2018',
		endDate: '06/2022',
		description: 'Subproject A05 on decomposition methods for mixed-integer optimal control.',
		programme: 'Second phase of SFB/TRR 154',
		partners: ['Günter Leugering', 'Alexander Martin'],
	},
	{
		id: 'trr154-b08-multilevel',
		title: 'Multilevel mixed-integer nonlinear optimization for gas markets',
		status: 'completed',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '07/2018',
		endDate: '06/2022',
		description: 'Subproject B08 on multilevel mixed-integer nonlinear optimization for gas markets.',
		programme: 'Second phase of SFB/TRR 154',
		partners: ['Veronika Grimm'],
	},
	{
		id: 'metis',
		title: 'METIS: Methods and Models for Energy Transformation and Integration Systems',
		shortName: 'METIS',
		status: 'completed',
		fundingAgency: 'BMWi',
		startDate: '08/2018',
		description: 'Project on methods and models for energy transformation and integration systems.',
		partners: ['Forschungszentrum Jülich IEK-3', 'Jülich Supercomputing Centre (IAS-JSC)', 'RWTH Aachen (JERI)'],
		reviewNote: 'The old site lists the project as completed but provides no end date.',
	},
	{
		id: 'trr154-b08-nominations',
		title: 'Welfare optimal nominations in gas networks and associated equilibria',
		status: 'completed',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '10/2016',
		endDate: '06/2018',
		description: 'Subproject B08 on welfare-optimal nominations in gas networks and associated equilibria.',
		programme: 'SFB/TRR 154',
		partners: ['Veronika Grimm', 'Lars Schewe', 'Gregor Zöttl'],
	},
	{
		id: 'trr154-compressor-models',
		title: 'Integration of complex compressor models in stationary MINLPs for gas networks using alternating direction methods',
		status: 'completed',
		fundingAgency: 'German Research Foundation (DFG)',
		startDate: '08/2015',
		endDate: '07/2016',
		description: 'Additional SFB/TRR 154 activity on integrating complex compressor models into stationary gas-network MINLPs using alternating direction methods.',
		programme: 'SFB/TRR 154',
		partners: ['Antonio Morsi', 'Björn Geißler', 'Lars Schewe'],
	},
	{
		id: 'forne',
		title: 'ForNe – Optimization of Gas Transport Networks',
		shortName: 'ForNe',
		status: 'completed',
		description: 'Project on the optimization of gas transport networks.',
		reviewNote: 'Dates and funding details were not visible on the old project page.',
	},
];
export const currentProjects = projects.filter((project) => project.status === 'current');
export const completedProjects = projects.filter((project) => project.status === 'completed');
