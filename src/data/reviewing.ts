export interface ReviewingVenue {
	id: string;
	name: string;
}

// Complete source list from the old Squarespace About page. The source presents
// these together as reviewing venues, so no finer category is inferred here.
export const reviewingVenues: ReviewingVenue[] = [
	'Applied Energy',
	'Applied Mathematical Modelling',
	'at – Automatisierungstechnik',
	'Automatica',
	'Chemical Engineering Research and Design',
	'Computational Optimization and Applications',
	'Computers & Operations Research',
	'Conference on Integer Programming and Combinatorial Optimization',
	'Discrete Applied Mathematics',
	'Energy Policy',
	'Energy Systems',
	'European Journal of Operational Research',
	'Expert Systems with Applications',
	'Fields Institute Communications Series',
	'IMA Journal of Numerical Analysis',
	'INFORMS Journal on Computing',
	'International Journal of Electrical Power and Energy Systems',
	'Journal of Cleaner Production',
	'Journal of Global Optimization',
	'Journal of Industrial and Management Optimization',
	'Journal of Optimization Theory and Applications',
	'Journal of Regulatory Economics',
	'Mathematical Methods of Operations Research',
	'Mathematical Programming A',
	'Mathematical Programming B',
	'Mathematical Programming C',
	'Mathematical Reviews/MathSciNet',
	'Open Journal of Mathematical Optimization',
	'Optimization',
	'Optimization and Engineering',
	'Optimization Letters',
	'Optimization Methods and Software',
	'OR Letters',
	'OR Spectrum',
	'SIAM Book Reviews',
	'SIAM Journal on Control and Optimization',
	'SIAM Journal on Optimization',
	'Soft Computing',
	'The Canadian Journal of Chemical Engineering',
	'TOP',
	'Transportation Science',
].map((name) => ({ id: `reviewing-venue-${name.toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`, name }));

export const reviewingSummary = `I have reviewed for more than 40 journals and other scholarly venues in mathematical optimization, operations research, applied mathematics, and energy systems.`;

export const selectedReviewingVenues = [
	'Mathematical Programming A',
	'Mathematical Programming B',
	'Mathematical Programming C',
	'SIAM Journal on Optimization',
	'European Journal of Operational Research',
	'INFORMS Journal on Computing',
];
