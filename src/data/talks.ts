export type TalkType =
	| 'plenary'
	| 'keynote'
	| 'invited'
	| 'lightning'
	| 'seminar'
	| 'lecture'
	| 'mini-course'
	| 'contributed'
	| 'unspecified';

export type EventKind =
	| 'conference'
	| 'workshop'
	| 'seminar'
	| 'colloquium'
	| 'school'
	| 'webinar'
	| 'public-lecture'
	| 'institutional'
	| 'other';

export type DeliveryMode = 'in-person' | 'online' | 'hybrid' | 'unspecified';

export interface TalkLink {
	kind: 'video' | 'slides' | 'event' | 'external';
	label: string;
	href: string;
}

export interface TalkDate {
	start: string;
	end?: string;
	display?: string;
}

export interface TalkSourceProvenance {
	recordNumber: number;
	sourceLine: number;
	rawLatex: string;
	rawArguments: string[];
	rawTitle: string;
	rawDate: string;
	rawEvent?: string;
	rawLocation?: string;
}

export interface Talk {
	id: string;
	title: string;
	date: TalkDate;
	eventName: string;
	eventKind?: EventKind;
	hostInstitution?: string;
	city?: string;
	region?: string;
	country?: string;
	venue?: string;
	deliveryMode: DeliveryMode;
	types: TalkType[];
	links: TalkLink[];
	notes: string[];
	source: TalkSourceProvenance;
}

export interface TalkReviewRecord {
	id: string;
	recordNumber: number;
	sourceLine: number;
	rawLatex: string;
	rawArguments: string[];
	reason: string;
	notes: string[];
}

export interface TalkMigration {
	automaticTalks: Talk[];
	needsReview: TalkReviewRecord[];
}

interface ParsedCall {
	recordNumber: number;
	sourceLine: number;
	rawLatex: string;
	args: string[];
	notes: string[];
}

interface ReviewedInterpretation {
	title: string;
	dateArgumentIndex: number;
	date?: TalkDate;
	eventName: string;
	eventKind?: EventKind;
	hostInstitution?: string;
	city?: string;
	region?: string;
	country?: string;
	venue?: string;
	deliveryMode: DeliveryMode;
	types: TalkType[];
	links: TalkLink[];
	notes: string[];
}

// Human-reviewed interpretations are added here one record at a time.
const reviewedInterpretations = new Map<number, ReviewedInterpretation>([
	[1, {
		title: 'BOBILib: Bilevel Optimization (Benchmark) Instance Library',
		dateArgumentIndex: 1,
		eventName: 'International Conference on Bilevel Optimization (ICBO) 2026',
		eventKind: 'conference',
		city: 'Pittsburgh',
		country: 'USA',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[2, {
		title: 'Nonlinear Flows Meet Bilevel and Robust Optimization',
		dateArgumentIndex: 1,
		eventName: 'EUROPT 2026',
		city: 'Linz',
		country: 'Austria',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[3, {
		title: 'A Gentle and Incomplete Introduction to Bilevel Optimization … and Some New Results',
		dateArgumentIndex: 1,
		date: { start: '2026-07-06', end: '2026-07-07', display: '6–7 July 2026' },
		eventName: 'Summer school of the EUROPT 2026',
		eventKind: 'school',
		city: 'Linz',
		country: 'Austria',
		deliveryMode: 'unspecified',
		types: ['invited', 'lecture'],
		links: [],
		notes: [],
	}],
	[4, {
		title: 'The Burial of Coupling Constraints in Linear Bilevel Optimization',
		dateArgumentIndex: 1,
		eventName: 'Colloquium of the Institute of Mathematics',
		eventKind: 'colloquium',
		hostInstitution: 'TU Clausthal',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[5, {
		title: 'A One-Extra Player Reduction of GNEPs to NEPs',
		dateArgumentIndex: 1,
		eventName: 'VAME 2026',
		city: 'Rancagua',
		country: 'Chile',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[6, {
		title: 'A Gentle and Incomplete Introduction to Bilevel Optimization … and Some New Results',
		dateArgumentIndex: 1,
		eventName: 'Autumn School “Equilibrium Problems” of the SFB Transregio 154 “Mathematische Modellierung, Simulation und Optimierung am Beispiel von Gasnetzwerken”',
		eventKind: 'school',
		hostInstitution: 'Humboldt-Universität zu Berlin',
		city: 'Berlin',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['invited', 'lecture'],
		links: [],
		notes: [],
	}],
	[7, {
		title: 'A Gentle and Incomplete Introduction to Linear Bilevel Optimization … and a Tiny New Result',
		dateArgumentIndex: 1,
		eventName: '5th EUROYoung Workshop 2025',
		eventKind: 'workshop',
		city: 'Naples',
		country: 'Italy',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[8, {
		title: 'The Burial of Coupling Constraints in Linear Bilevel Optimization',
		dateArgumentIndex: 1,
		eventName: 'Global Optimization Workshop 2025',
		eventKind: 'workshop',
		city: 'Stockholm',
		country: 'Sweden',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[9, {
		title: 'On Some Recent Advances in Bilevel and Robust Optimization',
		dateArgumentIndex: 1,
		eventName: 'EURO 2025',
		city: 'Leeds',
		country: 'UK',
		deliveryMode: 'unspecified',
		types: ['lightning'],
		links: [],
		notes: [],
	}],
	[10, {
		title: 'An Exact Method for Nonlinear Network Flow Interdiction Problems',
		dateArgumentIndex: 1,
		eventName: 'EURO 2025',
		city: 'Leeds',
		country: 'UK',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[11, {
		title: 'Nonlinear Flows Meet Bilevel and Robust Optimization',
		dateArgumentIndex: 1,
		eventName: 'Seminar at Universität Zürich',
		eventKind: 'seminar',
		hostInstitution: 'Universität Zürich',
		city: 'Zürich',
		country: 'Schweiz',
		deliveryMode: 'unspecified',
		types: ['invited', 'seminar'],
		links: [],
		notes: [],
	}],
	[12, {
		title: 'The Burial of Coupling Constraints in Linear Bilevel Optimization',
		dateArgumentIndex: 1,
		eventName: 'Seminar at CMM',
		eventKind: 'seminar',
		hostInstitution: 'CMM',
		city: 'Santiago',
		country: 'Chile',
		deliveryMode: 'unspecified',
		types: ['invited', 'seminar'],
		links: [],
		notes: [],
	}],
	[13, {
		title: 'A Gentle and Incomplete Introduction to Bilevel Optimization',
		dateArgumentIndex: 1,
		eventName: '11th Winter School on Network Optimization',
		eventKind: 'school',
		city: 'Estoril',
		country: 'Portugal',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[14, {
		title: 'BOBILib: Bilevel Optimization (Benchmark) Instance Library',
		dateArgumentIndex: 1,
		eventName: 'PGMODays',
		city: 'Paris',
		country: 'France',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[15, {
		title: 'BOBILib: Bilevel Optimization (Benchmark) Instance Library',
		dateArgumentIndex: 1,
		eventName: 'ISMP',
		city: 'Montréal',
		country: 'Canada',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[16, {
		title: 'A Gentle and Incomplete Introduction to Bilevel Optimization',
		dateArgumentIndex: 1,
		eventName: '24th edition of the Belgian Mathematical Optimization Workshop',
		eventKind: 'workshop',
		city: 'La Roche-en-Ardennes',
		country: 'Belgium',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[17, {
		title: 'A Primer on Bilevel Optimization Under Uncertainty',
		dateArgumentIndex: 1,
		eventName: 'Seminar of the WIAS',
		eventKind: 'seminar',
		hostInstitution: 'WIAS',
		city: 'Berlin',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[18, {
		title: 'A Primer on Bilevel and Robust Optimization',
		dateArgumentIndex: 1,
		eventName: "3rd International Workshop on Bilevel Optimization – IWOBIP'24",
		eventKind: 'workshop',
		city: 'Rancagua',
		country: 'Chile',
		deliveryMode: 'unspecified',
		types: ['invited', 'mini-course', 'lecture'],
		links: [],
		notes: [],
	}],
	[19, {
		title: "Learning the Follower's Objective Function in Sequential Bilevel Games",
		dateArgumentIndex: 1,
		eventName: 'PGMODAYS 2023',
		city: 'Paris',
		country: 'France',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[20, {
		title: 'The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques',
		dateArgumentIndex: 1,
		eventName: 'NeEDS seminar series',
		eventKind: 'seminar',
		deliveryMode: 'online',
		types: ['invited', 'seminar'],
		links: [{ kind: 'video', label: 'Video', href: 'https://youtu.be/C-5VjjoPLEg?si=lPASaF5Ysbx3M81X' }],
		notes: [],
	}],
	[21, {
		title: 'A Primer on Bilevel Optimization Under Uncertainty',
		dateArgumentIndex: 1,
		eventName: 'Seminar at Università degli Studi di Brescia',
		eventKind: 'seminar',
		hostInstitution: 'Università degli Studi di Brescia',
		city: 'Brescia',
		country: 'Italy',
		deliveryMode: 'unspecified',
		types: ['invited', 'seminar'],
		links: [],
		notes: [],
	}],
	[22, {
		title: '15 Years of Gas Network Optimization',
		dateArgumentIndex: 1,
		eventName: 'Conference on Applied, Computational and Algorithmic Optimization (CACAO) 2023',
		eventKind: 'conference',
		venue: 'Leibniz Universität Hannover',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[23, {
		title: 'Connections Between Bilevel and Robust Optimization',
		dateArgumentIndex: 1,
		eventName: 'Robust Optimization Webinar (ROW) Series',
		eventKind: 'webinar',
		deliveryMode: 'online',
		types: [],
		links: [],
		notes: [],
	}],
	[24, {
		title: 'Matchmaking Bilevel and (Γ-)Robust Optimization',
		dateArgumentIndex: 1,
		eventName: 'International Conference on Bilevel Optimization',
		eventKind: 'conference',
		city: 'Southampton',
		country: 'UK',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[25, {
		title: 'A Successive Mixed-Integer Linear Relaxation Method for MINLPs with Lipschitz Continuous Nonlinearities',
		dateArgumentIndex: 1,
		eventName: 'Learning from Both Sides Linear and Nonlinear Mixed-Integer Optimization',
		hostInstitution: 'Institut Mittag-Leffler',
		city: 'Stockholm',
		country: 'Sweden',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[26, {
		title: 'On a Computationally Ill-Behaved Bilevel Problem with a Continuous and Nonconvex Lower Level',
		dateArgumentIndex: 1,
		eventName: 'SIAM Conference on Optimization (OP23)',
		eventKind: 'conference',
		city: 'Seattle',
		country: 'USA',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[27, {
		title: 'Block Decomposition of Large-Scale MINLPs and (Penalty) Alternating Direction Methods',
		dateArgumentIndex: 1,
		eventName: 'III Sevilla MINLP Workshop',
		eventKind: 'workshop',
		venue: 'University of Seville, IMUS',
		country: 'Spain',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[29, {
		title: 'Bilevel Optimization: Some Basics, the European Gas Market under Uncertainty, and an Open Research Problem',
		dateArgumentIndex: 1,
		date: { start: '2023-03-02' },
		eventName: 'Seminar of the Institut of Applied Mathematics',
		eventKind: 'seminar',
		hostInstitution: 'Leibniz Universität Hannover',
		city: 'Hannover',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[30, {
		title: 'A Primer on Bilevel Optimization Under Uncertainty',
		dateArgumentIndex: 1,
		date: { start: '2022-11-17' },
		eventName: 'Department of Computer, Control and Management Engineering',
		eventKind: 'institutional',
		hostInstitution: 'Sapienza, Università di Roma',
		city: 'Rome',
		country: 'Italy',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[31, {
		title: 'The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques',
		dateArgumentIndex: 1,
		date: { start: '2022-11-17' },
		eventName: 'ESSEC Business School Paris',
		eventKind: 'institutional',
		city: 'Paris',
		country: 'France',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[32, {
		title: 'Bilevel Optimization: Some Basics, the European Gas Market under Uncertainty, and an Open Research Problem',
		dateArgumentIndex: 1,
		date: { start: '2022-11-07' },
		eventName: 'AdONE Seminar',
		eventKind: 'seminar',
		hostInstitution: 'TU München',
		city: 'München',
		country: 'Germany',
		deliveryMode: 'online',
		types: ['invited', 'seminar'],
		links: [],
		notes: [],
	}],
	[33, {
		title: 'Some Recent Results and Thoughts on Bilevel Optimization Under Uncertainty',
		dateArgumentIndex: 1,
		date: { start: '2022-11-02' },
		eventName: 'Dagstuhl seminar “Optimization at the Second Level”',
		eventKind: 'seminar',
		city: 'Dagstuhl',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[34, {
		title: 'The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques',
		dateArgumentIndex: 1,
		date: { start: '2022-09-26' },
		eventName: 'OASYS Seminar Series',
		eventKind: 'seminar',
		hostInstitution: 'University of Málaga',
		city: 'Málaga',
		country: 'Spain',
		deliveryMode: 'unspecified',
		types: ['invited', 'seminar'],
		links: [],
		notes: [],
	}],
	[35, {
		title: 'Multilevel Optimization: Basics, an Application to the European Gas Market, and an Open Research Problem',
		dateArgumentIndex: 1,
		date: { start: '2022-08-22' },
		eventName: 'Institut für Mathematik',
		eventKind: 'institutional',
		hostInstitution: 'Humboldt-Universität zu Berlin',
		city: 'Berlin',
		country: 'Germany',
		deliveryMode: 'unspecified',
		types: ['invited'],
		links: [],
		notes: [],
	}],
	[36, {
		title: 'Recent algorithmic advances in bilevel optimization',
		dateArgumentIndex: 1,
		date: { start: '2022-07-05' },
		eventName: '32nd EURO Conference',
		eventKind: 'conference',
		venue: 'Aalto University',
		city: 'Espoo',
		country: 'Finland',
		deliveryMode: 'unspecified',
		types: ['keynote'],
		links: [],
		notes: [],
	}],
	[37, {
		title: 'A “Survey” on Mixed-Integer Programming Techniques in Bilevel Optimization',
		dateArgumentIndex: 1,
		date: { start: '2022-07-04' },
		eventName: '32nd EURO Conference',
		eventKind: 'conference',
		venue: 'Aalto University',
		city: 'Espoo',
		country: 'Finland',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[38, {
		title: 'Multilevel Optimization: Basics, an Application to the European Gas Market, and an Open Research Problem',
		dateArgumentIndex: 2,
		date: { start: '2022-06-23' },
		eventName: 'SIAM UKIE National Student Chapter Conference',
		eventKind: 'conference',
		venue: 'University of Edinburgh',
		region: 'Scotland',
		country: 'UK',
		deliveryMode: 'unspecified',
		types: ['plenary'],
		links: [],
		notes: [],
	}],
	[39, {
		title: 'Some best practices and pitfalls of solving bilevel optimization problems',
		dateArgumentIndex: 2,
		date: { start: '2022-05-10' },
		eventName: 'Second International Workshop on “Variational Analysis and Applications for Modelling of Energy Exchange” (VAME 2022)',
		eventKind: 'workshop',
		venue: 'University of Brescia',
		country: 'Italy',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[40, {
		title: 'The Cost of Not Knowing Enough: Mixed-Integer Optimization with Lipschitz Nonlinearities',
		dateArgumentIndex: 2,
		date: { start: '2022-05-02' },
		eventName: 'Seminar series of the department of mathematics',
		eventKind: 'seminar',
		hostInstitution: 'KTH Stockholm',
		city: 'Stockholm',
		country: 'Sweden',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[41, {
		title: 'On Convex Lower-Level Black-Box Constraints in Bilevel Optimization with an Application to Gas Market Models with Chance Constraints',
		dateArgumentIndex: 1,
		date: { start: '2022-04-28' },
		eventName: 'ENRE Online Scientific Event Series',
		eventKind: 'webinar',
		deliveryMode: 'online',
		types: [],
		links: [],
		notes: ['The source has an unmatched closing parenthesis after “via Zoom”.'],
	}],
	[42, {
		title: 'A brief history of linear optimization',
		dateArgumentIndex: 1,
		date: { start: '2022-04-13' },
		eventName: 'Math History Lectures',
		eventKind: 'seminar',
		hostInstitution: 'Trier University',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[43, {
		title: 'Mixed-Integer Programming Techniques for the Minimum Sum-of-Squares Clustering Problem',
		dateArgumentIndex: 1,
		date: { start: '2022-02-24' },
		eventName: 'Séminaire du GERAD',
		eventKind: 'seminar',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[44, {
		title: 'Multilevel mixed-integer nonlinear optimization for electricity market design: Motivation, models, solution techniques, and results',
		dateArgumentIndex: 2,
		date: { start: '2021-12-17' },
		eventName: 'enOPTIMAL virtual seminar series',
		eventKind: 'seminar',
		hostInstitution: 'MIT',
		deliveryMode: 'online',
		types: [],
		links: [],
		notes: [],
	}],
	[45, {
		title: 'On Convex Lower-Level Black-Box Constraints in Bilevel Optimization with an Application to Gas Market Models with Chance Constraints',
		dateArgumentIndex: 2,
		date: { start: '2021-12-01' },
		eventName: 'PGMO Days 2021',
		city: 'Paris',
		country: 'France',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
	[85, {
		title: 'Investition in Netz und Erzeugung in liberalisierten Strommärkten',
		dateArgumentIndex: 2,
		eventName: '11th ÖGOR – IHS Workshop on “Mathematical Economics and Optimization in the Energy Sector” 2016',
		eventKind: 'workshop',
		venue: 'Institut für Höhere Studien (IHS)',
		city: 'Wien',
		deliveryMode: 'unspecified',
		types: [],
		links: [],
		notes: [],
	}],
]);

function readGroup(source: string, start: number): { value: string; end: number } {
	let depth = 0;
	for (let index = start; index < source.length; index += 1) {
		if (source[index] === '{' && source[index - 1] !== '\\') depth += 1;
		if (source[index] === '}' && source[index - 1] !== '\\' && --depth === 0) {
			return { value: source.slice(start + 1, index), end: index + 1 };
		}
	}
	throw new Error(`[talks.tex] Unclosed group near character ${start}.`);
}

function parseCalls(source: string): ParsedCall[] {
	const calls: ParsedCall[] = [];
	const marker = '\\item \\talk';
	let position = 0;
	let previousEnd = 0;
	while ((position = source.indexOf(marker, position)) >= 0) {
		const start = position;
		position += marker.length;
		const args: string[] = [];
		while (position < source.length) {
			while (/\s/.test(source[position] ?? '')) position += 1;
			if (source[position] !== '{') break;
			const group = readGroup(source, position);
			args.push(group.value);
			position = group.end;
		}
		const preceding = source.slice(previousEnd, start);
		const notes = [...preceding.matchAll(/^\s*%\s*Note:\s*(.+)$/gim)].map((match) => match[1].trim());
		calls.push({
			recordNumber: calls.length + 1,
			sourceLine: source.slice(0, start).split('\n').length,
			rawLatex: source.slice(start, position),
			args,
			notes,
		});
		previousEnd = position;
	}
	return calls;
}

function latexToText(value: string): string {
	return value
		.replace(/\\url\{([^}]+)\}/g, '$1')
		.replace(/\$\\Gamma\$/g, 'Γ')
		.replace(/\$([^$]+)\$/g, '$1')
		.replace(/\\dots\b/g, '…')
		.replace(/``/g, '“')
		.replace(/''/g, '”')
		.replace(/\\&/g, '&')
		.replace(/\\#/g, '#')
		.replace(/--/g, '–')
		.replace(/[{}]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function isoDate(year: string, month: string, day: string): string {
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function parseDate(raw: string): TalkDate {
	const match = /^\s*\\formatdate\{([^{}]+)\}\{([^{}]+)\}\{(\d{4})\}\s*$/.exec(raw);
	if (!match) throw new Error(`[talks.tex] Cannot normalize date: ${raw}`);
	const [, day, month, year] = match;
	const range = /^(\d{1,2})(?:--|\.\/)(\d{1,2})\.?$/.exec(day);
	if (range) {
		return {
			start: isoDate(year, month, range[1]),
			end: isoDate(year, month, range[2]),
			display: `${range[1]}–${range[2]} ${month.padStart(2, '0')} ${year}`,
		};
	}
	if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month)) {
		throw new Error(`[talks.tex] Unsupported date component: ${raw}`);
	}
	return { start: isoDate(year, month, day) };
}

function explicitTypes(event: string): TalkType[] {
	const types: TalkType[] = [];
	if (/\bplenary\s+talk\b/i.test(event)) types.push('plenary');
	if (/\bkeynote\s+talk\b/i.test(event)) types.push('keynote');
	if (/\b(invited\s+(?:talk|lectures?)|eingeladener\s+vortrag)\b/i.test(event)) types.push('invited');
	if (/\blightning\s+talk\b/i.test(event)) types.push('lightning');
	return types;
}

function explicitDeliveryMode(...values: string[]): DeliveryMode {
	const text = values.join(' ');
	if (/\b(?:via\s+Zoom|Online)\b/i.test(text)) return 'online';
	return 'unspecified';
}

function extractLinks(values: string[]): TalkLink[] {
	return values.flatMap((value) => [...value.matchAll(/\\url\{([^}]+)\}/g)].map((match) => ({
		kind: /youtu(?:\.be|be\.com)/i.test(match[1]) ? 'video' as const : 'external' as const,
		label: /youtu(?:\.be|be\.com)/i.test(match[1]) ? 'Video' : 'External link',
		href: match[1],
	})));
}

function reviewReason(args: string[]): string {
	const dateIndex = args.findIndex((argument) => argument.includes('\\formatdate'));
	if (args.length === 3 && dateIndex === 1) return 'Event and location are combined in one argument.';
	if (args.length < 4) return 'Event or location data is nested inside the date argument.';
	if (args.length > 4) return 'The record has separate extra location or institution arguments.';
	return 'The record does not match the declared title, event, date, location structure.';
}

export function migrateTalksTex(source: string): TalkMigration {
	const automaticTalks: Talk[] = [];
	const needsReview: TalkReviewRecord[] = [];
	for (const call of parseCalls(source)) {
		const id = `talk-${String(call.recordNumber).padStart(4, '0')}`;
		const dateIndex = call.args.findIndex((argument) => argument.includes('\\formatdate'));
		const reviewed = reviewedInterpretations.get(call.recordNumber);
		if (reviewed) {
			const rawTitle = call.args[0];
			const rawDate = call.args[reviewed.dateArgumentIndex];
			automaticTalks.push({
				id,
				title: reviewed.title,
				date: reviewed.date ?? parseDate(rawDate),
				eventName: reviewed.eventName,
				eventKind: reviewed.eventKind,
				hostInstitution: reviewed.hostInstitution,
				city: reviewed.city,
				region: reviewed.region,
				country: reviewed.country,
				venue: reviewed.venue,
				deliveryMode: reviewed.deliveryMode,
				types: reviewed.types,
				links: reviewed.links,
				notes: [...call.notes, ...reviewed.notes],
				source: {
					recordNumber: call.recordNumber,
					sourceLine: call.sourceLine,
					rawLatex: call.rawLatex,
					rawArguments: call.args,
					rawTitle,
					rawDate,
					rawEvent: call.args.find((_, index) => index !== 0 && index !== reviewed.dateArgumentIndex),
				},
			});
			continue;
		}
		if (call.args.length !== 4 || dateIndex !== 2) {
			needsReview.push({
				id,
				recordNumber: call.recordNumber,
				sourceLine: call.sourceLine,
				rawLatex: call.rawLatex,
				rawArguments: call.args,
				reason: reviewReason(call.args),
				notes: call.notes,
			});
			continue;
		}
		const [rawTitle, rawEvent, rawDate, rawLocation] = call.args;
		const eventName = latexToText(rawEvent);
		automaticTalks.push({
			id,
			title: latexToText(rawTitle),
			date: parseDate(rawDate),
			eventName,
			venue: latexToText(rawLocation),
			deliveryMode: explicitDeliveryMode(rawTitle, rawEvent, rawLocation),
			types: explicitTypes(eventName),
			links: extractLinks(call.args),
			notes: call.notes,
			source: {
				recordNumber: call.recordNumber,
				sourceLine: call.sourceLine,
				rawLatex: call.rawLatex,
				rawArguments: call.args,
				rawTitle,
				rawDate,
				rawEvent,
				rawLocation,
			},
		});
	}
	return { automaticTalks, needsReview };
}
