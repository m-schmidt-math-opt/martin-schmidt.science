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
	source: { recordNumber: number; sourceLine: number };
}

export const talks = [
  {
    "id": "talk-0001",
    "title": "BOBILib: Bilevel Optimization (Benchmark) Instance Library",
    "date": {
      "start": "2026-08-03"
    },
    "eventName": "International Conference on Bilevel Optimization (ICBO) 2026",
    "eventKind": "conference",
    "city": "Pittsburgh",
    "country": "USA",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 1,
      "sourceLine": 8
    }
  },
  {
    "id": "talk-0002",
    "title": "Nonlinear Flows Meet Bilevel and Robust Optimization",
    "date": {
      "start": "2026-07-08"
    },
    "eventName": "EUROPT 2026",
    "city": "Linz",
    "country": "Austria",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 2,
      "sourceLine": 11
    }
  },
  {
    "id": "talk-0003",
    "title": "A Gentle and Incomplete Introduction to Bilevel Optimization … and Some New Results",
    "date": {
      "start": "2026-07-06",
      "end": "2026-07-07",
      "display": "6–7 July 2026"
    },
    "eventName": "Summer school of the EUROPT 2026",
    "eventKind": "school",
    "city": "Linz",
    "country": "Austria",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "lecture"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 3,
      "sourceLine": 14
    }
  },
  {
    "id": "talk-0004",
    "title": "The Burial of Coupling Constraints in Linear Bilevel Optimization",
    "date": {
      "start": "2026-06-17"
    },
    "eventName": "Colloquium of the Institute of Mathematics",
    "eventKind": "colloquium",
    "hostInstitution": "TU Clausthal",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 4,
      "sourceLine": 18
    }
  },
  {
    "id": "talk-0005",
    "title": "A One-Extra Player Reduction of GNEPs to NEPs",
    "date": {
      "start": "2026-03-10"
    },
    "eventName": "VAME 2026",
    "city": "Rancagua",
    "country": "Chile",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 5,
      "sourceLine": 21
    }
  },
  {
    "id": "talk-0006",
    "title": "A Gentle and Incomplete Introduction to Bilevel Optimization … and Some New Results",
    "date": {
      "start": "2025-11-06"
    },
    "eventName": "Autumn School “Equilibrium Problems” of the SFB Transregio 154 “Mathematische Modellierung, Simulation und Optimierung am Beispiel von Gasnetzwerken”",
    "eventKind": "school",
    "hostInstitution": "Humboldt-Universität zu Berlin",
    "city": "Berlin",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "lecture"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 6,
      "sourceLine": 24
    }
  },
  {
    "id": "talk-0007",
    "title": "A Gentle and Incomplete Introduction to Linear Bilevel Optimization … and a Tiny New Result",
    "date": {
      "start": "2025-10-15"
    },
    "eventName": "5th EUROYoung Workshop 2025",
    "eventKind": "workshop",
    "city": "Naples",
    "country": "Italy",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 7,
      "sourceLine": 30
    }
  },
  {
    "id": "talk-0008",
    "title": "The Burial of Coupling Constraints in Linear Bilevel Optimization",
    "date": {
      "start": "2025-09-04"
    },
    "eventName": "Global Optimization Workshop 2025",
    "eventKind": "workshop",
    "city": "Stockholm",
    "country": "Sweden",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 8,
      "sourceLine": 34
    }
  },
  {
    "id": "talk-0009",
    "title": "On Some Recent Advances in Bilevel and Robust Optimization",
    "date": {
      "start": "2025-06-24"
    },
    "eventName": "EURO 2025",
    "city": "Leeds",
    "country": "UK",
    "deliveryMode": "unspecified",
    "types": [
      "lightning"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 9,
      "sourceLine": 37
    }
  },
  {
    "id": "talk-0010",
    "title": "An Exact Method for Nonlinear Network Flow Interdiction Problems",
    "date": {
      "start": "2025-06-23"
    },
    "eventName": "EURO 2025",
    "city": "Leeds",
    "country": "UK",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 10,
      "sourceLine": 40
    }
  },
  {
    "id": "talk-0011",
    "title": "Nonlinear Flows Meet Bilevel and Robust Optimization",
    "date": {
      "start": "2025-05-19"
    },
    "eventName": "Seminar at Universität Zürich",
    "eventKind": "seminar",
    "hostInstitution": "Universität Zürich",
    "city": "Zürich",
    "country": "Schweiz",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 11,
      "sourceLine": 42
    }
  },
  {
    "id": "talk-0012",
    "title": "The Burial of Coupling Constraints in Linear Bilevel Optimization",
    "date": {
      "start": "2025-03-12"
    },
    "eventName": "Seminar at CMM",
    "eventKind": "seminar",
    "hostInstitution": "CMM",
    "city": "Santiago",
    "country": "Chile",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 12,
      "sourceLine": 45
    }
  },
  {
    "id": "talk-0013",
    "title": "A Gentle and Incomplete Introduction to Bilevel Optimization",
    "date": {
      "start": "2025-01-20"
    },
    "eventName": "11th Winter School on Network Optimization",
    "eventKind": "school",
    "city": "Estoril",
    "country": "Portugal",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 13,
      "sourceLine": 48
    }
  },
  {
    "id": "talk-0014",
    "title": "BOBILib: Bilevel Optimization (Benchmark) Instance Library",
    "date": {
      "start": "2024-11-19"
    },
    "eventName": "PGMODays",
    "city": "Paris",
    "country": "France",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 14,
      "sourceLine": 51
    }
  },
  {
    "id": "talk-0015",
    "title": "BOBILib: Bilevel Optimization (Benchmark) Instance Library",
    "date": {
      "start": "2024-07-24"
    },
    "eventName": "ISMP",
    "city": "Montréal",
    "country": "Canada",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 15,
      "sourceLine": 53
    }
  },
  {
    "id": "talk-0016",
    "title": "A Gentle and Incomplete Introduction to Bilevel Optimization",
    "date": {
      "start": "2024-04-22"
    },
    "eventName": "24th edition of the Belgian Mathematical Optimization Workshop",
    "eventKind": "workshop",
    "city": "La Roche-en-Ardennes",
    "country": "Belgium",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 16,
      "sourceLine": 55
    }
  },
  {
    "id": "talk-0017",
    "title": "A Primer on Bilevel Optimization Under Uncertainty",
    "date": {
      "start": "2024-02-20"
    },
    "eventName": "Seminar of the WIAS",
    "eventKind": "seminar",
    "hostInstitution": "WIAS",
    "city": "Berlin",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 17,
      "sourceLine": 59
    }
  },
  {
    "id": "talk-0018",
    "title": "A Primer on Bilevel and Robust Optimization",
    "date": {
      "start": "2024-01-22"
    },
    "eventName": "3rd International Workshop on Bilevel Optimization – IWOBIP'24",
    "eventKind": "workshop",
    "city": "Rancagua",
    "country": "Chile",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "mini-course",
      "lecture"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 18,
      "sourceLine": 62
    }
  },
  {
    "id": "talk-0019",
    "title": "Learning the Follower's Objective Function in Sequential Bilevel Games",
    "date": {
      "start": "2023-11-28"
    },
    "eventName": "PGMODAYS 2023",
    "city": "Paris",
    "country": "France",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 19,
      "sourceLine": 66
    }
  },
  {
    "id": "talk-0020",
    "title": "The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques",
    "date": {
      "start": "2023-11-13"
    },
    "eventName": "NeEDS seminar series",
    "eventKind": "seminar",
    "deliveryMode": "online",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [
      {
        "kind": "video",
        "label": "Video",
        "href": "https://youtu.be/C-5VjjoPLEg?si=lPASaF5Ysbx3M81X"
      }
    ],
    "notes": [],
    "source": {
      "recordNumber": 20,
      "sourceLine": 69
    }
  },
  {
    "id": "talk-0021",
    "title": "A Primer on Bilevel Optimization Under Uncertainty",
    "date": {
      "start": "2023-11-07"
    },
    "eventName": "Seminar at Università degli Studi di Brescia",
    "eventKind": "seminar",
    "hostInstitution": "Università degli Studi di Brescia",
    "city": "Brescia",
    "country": "Italy",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 21,
      "sourceLine": 74
    }
  },
  {
    "id": "talk-0022",
    "title": "15 Years of Gas Network Optimization",
    "date": {
      "start": "2023-09-25"
    },
    "eventName": "Conference on Applied, Computational and Algorithmic Optimization (CACAO) 2023",
    "eventKind": "conference",
    "country": "Germany",
    "venue": "Leibniz Universität Hannover",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 22,
      "sourceLine": 77
    }
  },
  {
    "id": "talk-0023",
    "title": "Connections Between Bilevel and Robust Optimization",
    "date": {
      "start": "2023-09-22"
    },
    "eventName": "Robust Optimization Webinar (ROW) Series",
    "eventKind": "webinar",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 23,
      "sourceLine": 81
    }
  },
  {
    "id": "talk-0024",
    "title": "Matchmaking Bilevel and (Γ-)Robust Optimization",
    "date": {
      "start": "2023-08-10"
    },
    "eventName": "International Conference on Bilevel Optimization",
    "eventKind": "conference",
    "city": "Southampton",
    "country": "UK",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 24,
      "sourceLine": 84
    }
  },
  {
    "id": "talk-0025",
    "title": "A Successive Mixed-Integer Linear Relaxation Method for MINLPs with Lipschitz Continuous Nonlinearities",
    "date": {
      "start": "2023-07-06"
    },
    "eventName": "Learning from Both Sides Linear and Nonlinear Mixed-Integer Optimization",
    "hostInstitution": "Institut Mittag-Leffler",
    "city": "Stockholm",
    "country": "Sweden",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 25,
      "sourceLine": 87
    }
  },
  {
    "id": "talk-0026",
    "title": "On a Computationally Ill-Behaved Bilevel Problem with a Continuous and Nonconvex Lower Level",
    "date": {
      "start": "2023-05-31"
    },
    "eventName": "SIAM Conference on Optimization (OP23)",
    "eventKind": "conference",
    "city": "Seattle",
    "country": "USA",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 26,
      "sourceLine": 92
    }
  },
  {
    "id": "talk-0027",
    "title": "Block Decomposition of Large-Scale MINLPs and (Penalty) Alternating Direction Methods",
    "date": {
      "start": "2023-03-30"
    },
    "eventName": "III Sevilla MINLP Workshop",
    "eventKind": "workshop",
    "country": "Spain",
    "venue": "University of Seville, IMUS",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 27,
      "sourceLine": 96
    }
  },
  {
    "id": "talk-0028",
    "title": "Mathematik – Wozu? Über Graphentheorie und Google",
    "date": {
      "start": "2023-03-08"
    },
    "eventName": "Mathematik erFassen!",
    "venue": "Universität Trier, Germany",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 28,
      "sourceLine": 100
    }
  },
  {
    "id": "talk-0029",
    "title": "Bilevel Optimization: Some Basics, the European Gas Market under Uncertainty, and an Open Research Problem",
    "date": {
      "start": "2023-03-02"
    },
    "eventName": "Seminar of the Institut of Applied Mathematics",
    "eventKind": "seminar",
    "hostInstitution": "Leibniz Universität Hannover",
    "city": "Hannover",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 29,
      "sourceLine": 103
    }
  },
  {
    "id": "talk-0030",
    "title": "A Primer on Bilevel Optimization Under Uncertainty",
    "date": {
      "start": "2022-11-17"
    },
    "eventName": "Department of Computer, Control and Management Engineering",
    "eventKind": "institutional",
    "hostInstitution": "Sapienza, Università di Roma",
    "city": "Rome",
    "country": "Italy",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 30,
      "sourceLine": 108
    }
  },
  {
    "id": "talk-0031",
    "title": "The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques",
    "date": {
      "start": "2022-11-17"
    },
    "eventName": "ESSEC Business School Paris",
    "eventKind": "institutional",
    "city": "Paris",
    "country": "France",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 31,
      "sourceLine": 112
    }
  },
  {
    "id": "talk-0032",
    "title": "Bilevel Optimization: Some Basics, the European Gas Market under Uncertainty, and an Open Research Problem",
    "date": {
      "start": "2022-11-07"
    },
    "eventName": "AdONE Seminar",
    "eventKind": "seminar",
    "hostInstitution": "TU München",
    "city": "München",
    "country": "Germany",
    "deliveryMode": "online",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 32,
      "sourceLine": 116
    }
  },
  {
    "id": "talk-0033",
    "title": "Some Recent Results and Thoughts on Bilevel Optimization Under Uncertainty",
    "date": {
      "start": "2022-11-02"
    },
    "eventName": "Dagstuhl seminar “Optimization at the Second Level”",
    "eventKind": "seminar",
    "city": "Dagstuhl",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 33,
      "sourceLine": 120
    }
  },
  {
    "id": "talk-0034",
    "title": "The Minimum Sum-of-Squares Clustering Problem: Robustification and Global Optimization Techniques",
    "date": {
      "start": "2022-09-26"
    },
    "eventName": "OASYS Seminar Series",
    "eventKind": "seminar",
    "hostInstitution": "University of Málaga",
    "city": "Málaga",
    "country": "Spain",
    "deliveryMode": "unspecified",
    "types": [
      "invited",
      "seminar"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 34,
      "sourceLine": 123
    }
  },
  {
    "id": "talk-0035",
    "title": "Multilevel Optimization: Basics, an Application to the European Gas Market, and an Open Research Problem",
    "date": {
      "start": "2022-08-22"
    },
    "eventName": "Institut für Mathematik",
    "eventKind": "institutional",
    "hostInstitution": "Humboldt-Universität zu Berlin",
    "city": "Berlin",
    "country": "Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 35,
      "sourceLine": 128
    }
  },
  {
    "id": "talk-0036",
    "title": "Recent algorithmic advances in bilevel optimization",
    "date": {
      "start": "2022-07-05"
    },
    "eventName": "32nd EURO Conference",
    "eventKind": "conference",
    "city": "Espoo",
    "country": "Finland",
    "venue": "Aalto University",
    "deliveryMode": "unspecified",
    "types": [
      "keynote"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 36,
      "sourceLine": 133
    }
  },
  {
    "id": "talk-0037",
    "title": "A “Survey” on Mixed-Integer Programming Techniques in Bilevel Optimization",
    "date": {
      "start": "2022-07-04"
    },
    "eventName": "32nd EURO Conference",
    "eventKind": "conference",
    "city": "Espoo",
    "country": "Finland",
    "venue": "Aalto University",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 37,
      "sourceLine": 136
    }
  },
  {
    "id": "talk-0038",
    "title": "Multilevel Optimization: Basics, an Application to the European Gas Market, and an Open Research Problem",
    "date": {
      "start": "2022-06-23"
    },
    "eventName": "SIAM UKIE National Student Chapter Conference",
    "eventKind": "conference",
    "region": "Scotland",
    "country": "UK",
    "venue": "University of Edinburgh",
    "deliveryMode": "unspecified",
    "types": [
      "plenary"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 38,
      "sourceLine": 139
    }
  },
  {
    "id": "talk-0039",
    "title": "Some best practices and pitfalls of solving bilevel optimization problems",
    "date": {
      "start": "2022-05-10"
    },
    "eventName": "Second International Workshop on “Variational Analysis and Applications for Modelling of Energy Exchange” (VAME 2022)",
    "eventKind": "workshop",
    "country": "Italy",
    "venue": "University of Brescia",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 39,
      "sourceLine": 144
    }
  },
  {
    "id": "talk-0040",
    "title": "The Cost of Not Knowing Enough: Mixed-Integer Optimization with Lipschitz Nonlinearities",
    "date": {
      "start": "2022-05-02"
    },
    "eventName": "Seminar series of the department of mathematics",
    "eventKind": "seminar",
    "hostInstitution": "KTH Stockholm",
    "city": "Stockholm",
    "country": "Sweden",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 40,
      "sourceLine": 149
    }
  },
  {
    "id": "talk-0041",
    "title": "On Convex Lower-Level Black-Box Constraints in Bilevel Optimization with an Application to Gas Market Models with Chance Constraints",
    "date": {
      "start": "2022-04-28"
    },
    "eventName": "ENRE Online Scientific Event Series",
    "eventKind": "webinar",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [
      "The source has an unmatched closing parenthesis after “via Zoom”."
    ],
    "source": {
      "recordNumber": 41,
      "sourceLine": 153
    }
  },
  {
    "id": "talk-0042",
    "title": "A brief history of linear optimization",
    "date": {
      "start": "2022-04-13"
    },
    "eventName": "Math History Lectures",
    "eventKind": "seminar",
    "hostInstitution": "Trier University",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 42,
      "sourceLine": 157
    }
  },
  {
    "id": "talk-0043",
    "title": "Mixed-Integer Programming Techniques for the Minimum Sum-of-Squares Clustering Problem",
    "date": {
      "start": "2022-02-24"
    },
    "eventName": "Séminaire du GERAD",
    "eventKind": "seminar",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 43,
      "sourceLine": 160
    }
  },
  {
    "id": "talk-0044",
    "title": "Multilevel mixed-integer nonlinear optimization for electricity market design: Motivation, models, solution techniques, and results",
    "date": {
      "start": "2021-12-17"
    },
    "eventName": "enOPTIMAL virtual seminar series",
    "eventKind": "seminar",
    "hostInstitution": "MIT",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 44,
      "sourceLine": 163
    }
  },
  {
    "id": "talk-0045",
    "title": "On Convex Lower-Level Black-Box Constraints in Bilevel Optimization with an Application to Gas Market Models with Chance Constraints",
    "date": {
      "start": "2021-12-01"
    },
    "eventName": "PGMO Days 2021",
    "city": "Paris",
    "country": "France",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 45,
      "sourceLine": 168
    }
  },
  {
    "id": "talk-0046",
    "title": "Existence of Energy Market Equilibria with Convex and Nonconvex Players",
    "date": {
      "start": "2021-11-12"
    },
    "eventName": "Trans-Atlantic Infraday Conference 2021 at Aalto University, Finland, via “Zoom”",
    "venue": "Espoo, Finland",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 46,
      "sourceLine": 171
    }
  },
  {
    "id": "talk-0047",
    "title": "Outer Approximation for Global Optimization of Mixed-Integer Quadratic Bilevel Problems",
    "date": {
      "start": "2021-07-13"
    },
    "eventName": "EURO 2021 “in Athens”",
    "venue": "Athens",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 47,
      "sourceLine": 175
    }
  },
  {
    "id": "talk-0048",
    "title": "A Gentle and Incomplete Introduction to Bilevel Optimization",
    "date": {
      "start": "2021-06-23"
    },
    "eventName": "JPOC Spring School on MINLP and Bilevel Problems",
    "venue": "Paris (lecture series via Zoom)",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 48,
      "sourceLine": 178
    }
  },
  {
    "id": "talk-0049",
    "title": "Mixed-Integer Nonlinear Optimization",
    "date": {
      "start": "2021-06-22"
    },
    "eventName": "JPOC Spring School on MINLP and Bilevel Problems",
    "venue": "Paris (lecture series via Zoom)",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 49,
      "sourceLine": 182
    }
  },
  {
    "id": "talk-0050",
    "title": "Decomposition Methods for Robustified k-Means Clustering Problems",
    "date": {
      "start": "2021-04-14"
    },
    "eventName": "ECMI 2021 conference",
    "venue": "Bergische Universität Wuppertal (via Zoom)",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 50,
      "sourceLine": 185
    }
  },
  {
    "id": "talk-0051",
    "title": "Die Mathematik der Energiewende (via Zoom)",
    "date": {
      "start": "2021-02-03"
    },
    "eventName": "#LecturesForFuture der Universität Trier",
    "venue": "Universität Trier",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 51,
      "sourceLine": 189
    }
  },
  {
    "id": "talk-0052",
    "title": "(Mixed-Integer) Nonlinear Optimization for District Heating Networks (via Zoom)",
    "date": {
      "start": "2020-12-15"
    },
    "eventName": "Oberseminar “Numerical Optimization” of the Chair of Numerical Optimization",
    "venue": "Universität Konstanz",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 52,
      "sourceLine": 192
    }
  },
  {
    "id": "talk-0053",
    "title": "Robust Linear Complementarity Problems (via Zoom)",
    "date": {
      "start": "2020-06-26"
    },
    "eventName": "Weekly Seminar on Optimization and Equilibrium Problems: Models, Applications, Algorithms",
    "venue": "University of Maryland, Baltmore, USA",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 53,
      "sourceLine": 196
    }
  },
  {
    "id": "talk-0054",
    "title": "Robust Linear Complementarity Problems (via Zoom)",
    "date": {
      "start": "2020-06-26"
    },
    "eventName": "Seminar des Instituts für Mathematische Optimierung der TU Braunschweig",
    "venue": "TU Braunschweig, Germany",
    "deliveryMode": "online",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 54,
      "sourceLine": 200
    }
  },
  {
    "id": "talk-0055",
    "title": "Mathematik – Wozu? Über Graphentheorie und Google",
    "date": {
      "start": "2019-10-15",
      "end": "2019-10-16",
      "display": "15–16 10 2019"
    },
    "eventName": "Tag der Mathematik",
    "venue": "Universität Trier, Germany",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 55,
      "sourceLine": 203
    }
  },
  {
    "id": "talk-0056",
    "title": "Mixed-Integer Optimization: State of the Art and Applications",
    "date": {
      "start": "2019-10-02"
    },
    "eventName": "Invited Talk, NEC Laboratories Europe GmbH",
    "venue": "Heidelberg, Germany",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 56,
      "sourceLine": 207
    }
  },
  {
    "id": "talk-0057",
    "title": "(Γ-)Robustified Market Equilibrium Models & (Γ-)Robust LCPs",
    "date": {
      "start": "2019-08-01"
    },
    "eventName": "The XV International Conference on Stochastic Programming",
    "venue": "Trondheim, Norway",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 57,
      "sourceLine": 210
    }
  },
  {
    "id": "talk-0058",
    "title": "A Global Outer Approximation Algorithm for Mixed-Integer Quadratic Bilevel Problems",
    "date": {
      "start": "2019-06-26"
    },
    "eventName": "30th European Conference on Operational Research",
    "venue": "Dublin, Ireland",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 58,
      "sourceLine": 213
    }
  },
  {
    "id": "talk-0059",
    "title": "Penalty alternating direction methods: Theory, practice, and their relation to feasibility pumps",
    "date": {
      "start": "2019-05-15"
    },
    "eventName": "Mathematisches Kolloquium der TU Ilmenau",
    "venue": "Ilmenau, Germany",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 59,
      "sourceLine": 216
    }
  },
  {
    "id": "talk-0060",
    "title": "Mathematik – Wozu? Über Graphentheorie und Google",
    "date": {
      "start": "2019-04-02"
    },
    "eventName": "Mathematik erFassen!",
    "venue": "Trier, Germany",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 60,
      "sourceLine": 219
    }
  },
  {
    "id": "talk-0061",
    "title": "A Multilevel Model of the European Entry-Exit Gas Market",
    "date": {
      "start": "2018-10-10"
    },
    "eventName": "2nd Conference on Mathematics of Gas Transport",
    "venue": "Berlin, Germany",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 61,
      "sourceLine": 222
    }
  },
  {
    "id": "talk-0062",
    "title": "The Impact of Physics on Market Equilibria in Energy Networks",
    "date": {
      "start": "2018-07-04"
    },
    "eventName": "ISMP 2018. 23rd International Symposium on Mathematical Programming",
    "venue": "Bordeaux, France",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 62,
      "sourceLine": 225
    }
  },
  {
    "id": "talk-0063",
    "title": "Combining Network Design and Graph Partitioning in a Multilevel Framework for Electricity Markets",
    "date": {
      "start": "2018-06-22"
    },
    "eventName": "IWOBIP'18. 2nd International Workshop on Bilevel Programming",
    "venue": "INRIA Lille-Nord Europe, France",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 63,
      "sourceLine": 228
    }
  },
  {
    "id": "talk-0064",
    "title": "Price Zones and Investment Incentives in Electricity Markets: An Application of Multi-Level Optimization with Graph Partitioning",
    "date": {
      "start": "2018-05-17"
    },
    "eventName": "13. ÖGOR-IHS Workshop & ÖGOR Arbeitskreis Mathematische Ökonomie und Optimierung in der Energiewirtschaft 2018",
    "venue": "Institut für Höhere Studien, Wien",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 64,
      "sourceLine": 233
    }
  },
  {
    "id": "talk-0065",
    "title": "Mathematik – Wozu? Über Graphentheorie und Google",
    "date": {
      "start": "2018-05-02"
    },
    "eventName": "Schülervortrag am Dürer-Gymnasium Nürnberg",
    "venue": "Nürnberg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 65,
      "sourceLine": 238
    }
  },
  {
    "id": "talk-0066",
    "title": "Mathematische Optimierungsverfahren für mehrstufige Modelle im Strommarktdesign",
    "date": {
      "start": "2018-04-20"
    },
    "eventName": "Kolloquiumsvortrag an der RWTH Aachen",
    "venue": "Aachen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [
      "Maybe better comment out for certain lists"
    ],
    "source": {
      "recordNumber": 66,
      "sourceLine": 242
    }
  },
  {
    "id": "talk-0067",
    "title": "Network Expansion, Price Zones, and Investment Incentives in Electricity Markets: An Application of Multi-Level Optimization to the German Electricity Market",
    "date": {
      "start": "2018-04-05"
    },
    "eventName": "Eingeladener Vortrag bei Siemens zum Thema “Mathematical Algorithms for Comprehensive Energy Management Systems”",
    "venue": "Erlangen",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 67,
      "sourceLine": 245
    }
  },
  {
    "id": "talk-0068",
    "title": "Mathematische Optimierung im Energiebereich",
    "date": {
      "start": "2018-03-20"
    },
    "eventName": "Eingeladener Vortrag bei der sonnen GmbH",
    "venue": "Wildpoldsried",
    "deliveryMode": "unspecified",
    "types": [
      "invited"
    ],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 68,
      "sourceLine": 250
    }
  },
  {
    "id": "talk-0069",
    "title": "Mixed-Integer Optimization for Energy Systems",
    "date": {
      "start": "2018-01-29"
    },
    "eventName": "661. WE-Heraeus-Seminar “Nonlinear Dynamics, Optimization and Control of Distributed Energy Systems”",
    "venue": "Bad Honnef",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 69,
      "sourceLine": 252
    }
  },
  {
    "id": "talk-0070",
    "title": "Dekompositionsmethoden für nichtlineare und gemischt-ganzzahlige Optimierung",
    "date": {
      "start": "2018-01-25"
    },
    "eventName": "Kolloquiumsvortrag an der Universität Trier",
    "venue": "Trier",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [
      "Maybe better comment out for certain lists"
    ],
    "source": {
      "recordNumber": 70,
      "sourceLine": 257
    }
  },
  {
    "id": "talk-0071",
    "title": "Mathematik für die Energiewende",
    "date": {
      "start": "2017-10-21"
    },
    "eventName": "Lange der Nacht der Wissenschaften 2017",
    "venue": "Nürnberg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 71,
      "sourceLine": 260
    }
  },
  {
    "id": "talk-0072",
    "title": "MIP-based instantaneous control of mixed-integer PDE-constrained gas transport problems",
    "date": {
      "start": "2017-07-18"
    },
    "eventName": "IFORS 2017",
    "venue": "Quebec City",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 72,
      "sourceLine": 262
    }
  },
  {
    "id": "talk-0073",
    "title": "Penalty Alternating Direction Methods for Mixed-Integer Nonlinear Optimization",
    "date": {
      "start": "2017-05-24"
    },
    "eventName": "SIAM Conference on Optimization 2017",
    "venue": "Vancouver",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 73,
      "sourceLine": 265
    }
  },
  {
    "id": "talk-0074",
    "title": "Mathematical Optimization for Energy Networks",
    "date": {
      "start": "2017-04-03"
    },
    "eventName": "Advances in Renewable Energy Technologies",
    "venue": "Texas A&M University at Qatar. Doha",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 74,
      "sourceLine": 268
    }
  },
  {
    "id": "talk-0075",
    "title": "Optimal Price Zones of Electricity Markets: A Mixed-Integer Multilevel Model and Global Solution Approaches",
    "date": {
      "start": "2017-02-16"
    },
    "eventName": "Workshop Energiemärkte",
    "venue": "Energie Campus Nürnberg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 75,
      "sourceLine": 271
    }
  },
  {
    "id": "talk-0076",
    "title": "Optimal Price Zones of Electricity Markets: A Mixed-Integer Multilevel Model and Global Solution Approaches",
    "date": {
      "start": "2017-01-09"
    },
    "eventName": "21st Combinatorial Optimization Workshop",
    "venue": "Aussois",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 76,
      "sourceLine": 275
    }
  },
  {
    "id": "talk-0077",
    "title": "Penalty Alternating Direction Methods for Mixed-Integer Optimization: A New View on Feasibility Pumps",
    "date": {
      "start": "2016-08-31"
    },
    "eventName": "OR 2016 - Annual International Conference of the German Operations Research Society",
    "venue": "Hamburg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 77,
      "sourceLine": 279
    }
  },
  {
    "id": "talk-0078",
    "title": "Optimal Price Zones for the German Electricity Market",
    "date": {
      "start": "2016-07-12"
    },
    "eventName": "iSEneC 2016 - Integration of Sustainable Energy Conference",
    "venue": "Nürnberg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 78,
      "sourceLine": 283
    }
  },
  {
    "id": "talk-0079",
    "title": "A Penalty Alternating Direction Method for Nonconvex MINLPs in Gas Transport",
    "date": {
      "start": "2016-07-05"
    },
    "eventName": "EURO 2016 - 28th European Conference on Operational Research",
    "venue": "Posen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 79,
      "sourceLine": 286
    }
  },
  {
    "id": "talk-0080",
    "title": "Graph Partitioning with Connectivity Constraints for Multilevel Electricity Market Models",
    "date": {
      "start": "2016-06-23"
    },
    "eventName": "Technische Universität Braunschweig. Seminar des Instituts für Mathematische Optimierung",
    "venue": "Braunschweig",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 80,
      "sourceLine": 289
    }
  },
  {
    "id": "talk-0081",
    "title": "Von mehrstufiger Optimierung und Stromnetzen, Graphpartitionierung und Marktpreisen",
    "date": {
      "start": "2016-06-20"
    },
    "eventName": "Unsere Fakultät - Unsere Forschung. Friedrich-Alexander-Universität Erlangen-Nürnberg",
    "venue": "Erlangen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 81,
      "sourceLine": 293
    }
  },
  {
    "id": "talk-0082",
    "title": "Feasibility Pumps as Penalty Alternating Direction Methods for MINLPs: Theory and Computations",
    "date": {
      "start": "2016-05-19"
    },
    "eventName": "Leibniz Universität Hannover, Seminar “Algorithmic Optimization” at the Institute of Applied Mathematics",
    "venue": "Hannover",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 82,
      "sourceLine": 297
    }
  },
  {
    "id": "talk-0083",
    "title": "Mixed-Integer Nonlinear Optimization of Stationary Gas Transport Problems",
    "date": {
      "start": "2016-05-17"
    },
    "eventName": "Technische Universität Berlin, Kolloquium ModNumDiff",
    "venue": "Berlin",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 83,
      "sourceLine": 301
    }
  },
  {
    "id": "talk-0084",
    "title": "Gemischt-ganzzahlige nichtlineare Optimierung für den Gas- und Stromtransport",
    "date": {
      "start": "2016-05-11"
    },
    "eventName": "Universität Konstanz, Seminar AG Numerik (Fachbereich Mathematik & Statistik)",
    "venue": "Konstanz",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 84,
      "sourceLine": 304
    }
  },
  {
    "id": "talk-0085",
    "title": "Investition in Netz und Erzeugung in liberalisierten Strommärkten",
    "date": {
      "start": "2016-04-27"
    },
    "eventName": "11th ÖGOR – IHS Workshop on “Mathematical Economics and Optimization in the Energy Sector” 2016",
    "eventKind": "workshop",
    "city": "Wien",
    "venue": "Institut für Höhere Studien (IHS)",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 85,
      "sourceLine": 307
    }
  },
  {
    "id": "talk-0086",
    "title": "Transmission and Generation Investment in Liberalized Electricity Markets",
    "date": {
      "start": "2015-09-03"
    },
    "eventName": "OR 2015 - Annual International Conference of the German Operations Research Society 2015",
    "venue": "Wien",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 86,
      "sourceLine": 311
    }
  },
  {
    "id": "talk-0087",
    "title": "Solving Power-Constrained Gas Transport Problems using an MIP-based Alternating Direction Method",
    "date": {
      "start": "2015-07-17"
    },
    "eventName": "ISMP 2015 - 22nd International Symposium on Mathematical Programming",
    "venue": "Pittsburgh",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 87,
      "sourceLine": 314
    }
  },
  {
    "id": "talk-0088",
    "title": "Transmission and Generation Investment in Electricity Markets: The Effects of Market Splitting and Network Fee Regimes",
    "date": {
      "start": "2015-02-23"
    },
    "eventName": "Leibniz Universität Hannover. Oberseminar Algorithmische Optimierung",
    "venue": "Hannover",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 88,
      "sourceLine": 318
    }
  },
  {
    "id": "talk-0089",
    "title": "State-of-the-Art in Gas Transport Optimization",
    "date": {
      "start": "2014-12-15"
    },
    "eventName": "Workshop on “Gas Transport and Gas Market Modeling”. Energie Campus Nürnberg",
    "venue": "Nürnberg",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 89,
      "sourceLine": 321
    }
  },
  {
    "id": "talk-0090",
    "title": "Continuous Reformulations for Mixed-Integer Nonlinear Optimization of Gas Compressor Stations",
    "date": {
      "start": "2014-09-03"
    },
    "eventName": "OR 2014 - International Conference on Operations Research 2014",
    "venue": "Aachen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 90,
      "sourceLine": 324
    }
  },
  {
    "id": "talk-0091",
    "title": "Optimierung - Die Mathematik der Energiewende",
    "date": {
      "start": "2014-07-04"
    },
    "eventName": "Tag der Erlanger Mathematik",
    "venue": "Erlangen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 91,
      "sourceLine": 327
    }
  },
  {
    "id": "talk-0092",
    "title": "Nonlinear Programming Techniques for Gas Transport Optimization Problems",
    "date": {
      "start": "2014-05-19"
    },
    "eventName": "SIAM Conference on Optimization 2014",
    "venue": "San Diego",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 92,
      "sourceLine": 329
    }
  },
  {
    "id": "talk-0093",
    "title": "A Generic Interior-Point Framework for Nonsmooth and Complementarity Constrained Nonlinear Optimization",
    "date": {
      "start": "2013-01-23"
    },
    "eventName": "Leibniz Universität Hannover",
    "venue": "Hannover",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 93,
      "sourceLine": 332
    }
  },
  {
    "id": "talk-0094",
    "title": "Mixed-Integer Nonlinear Optimization of Gas Compressor Stations",
    "date": {
      "start": "2012-09-06"
    },
    "eventName": "OR 2012 - International Annual Conference of the German OR Society 2012",
    "venue": "Hannover",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 94,
      "sourceLine": 335
    }
  },
  {
    "id": "talk-0095",
    "title": "An Extended Interior Point Method for Nonsmooth and Complementarity Constrained Nonlinear Optimization in Gas Networks",
    "date": {
      "start": "2012-08-23"
    },
    "eventName": "ISMP 2012 - 21st International Symposium on Mathematical Programming",
    "venue": "Berlin",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 95,
      "sourceLine": 338
    }
  },
  {
    "id": "talk-0096",
    "title": "Sequential NLP Solving for High-Accuracy Nonlinear Optimization Models in Gas Networks",
    "date": {
      "start": "2011-09-14"
    },
    "eventName": "25th IFIP TC 7 Conference on System Modeling and Optimization",
    "venue": "Berlin",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 96,
      "sourceLine": 342
    }
  },
  {
    "id": "talk-0097",
    "title": "MPEC Based Primal Heuristics for MINLPs",
    "date": {
      "start": "2011-06-16"
    },
    "eventName": "SIGOPT - International Conference on Optimization 2011",
    "venue": "Pfalz-Akademie Lambrecht",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 97,
      "sourceLine": 345
    }
  },
  {
    "id": "talk-0098",
    "title": "An MINLP Primal Heuristic for Gas Networks",
    "date": {
      "start": "2011-05-16"
    },
    "eventName": "SIAM Conference on Optimization",
    "venue": "Darmstadt",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 98,
      "sourceLine": 347
    }
  },
  {
    "id": "talk-0099",
    "title": "Gemischt-ganzzahlige nichtlineare Optimierung von Gasnetzwerken",
    "date": {
      "start": "2011-02-16"
    },
    "eventName": "InfoMaTech - Vortragsreihe der Forschungskreise der FHDW Hannover",
    "venue": "Hannover",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 99,
      "sourceLine": 349
    }
  },
  {
    "id": "talk-0100",
    "title": "High Accuracy Stationary Optimization in Gas Networks",
    "date": {
      "start": "2010-07-12"
    },
    "eventName": "EURO 2010 - 24th European Conference on Operational Research",
    "venue": "Lissabon",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 100,
      "sourceLine": 352
    }
  },
  {
    "id": "talk-0101",
    "title": "KronCrypt - Der Approximationssatz von Kronecker in der symmetrischen Kryptographie",
    "date": {
      "start": "2008-11-10"
    },
    "eventName": "9. Kryptotag der Fachgruppe “Angewandte Kryptologie” der Gesellschaft für Informatik e.V",
    "venue": "Gelsenkirchen",
    "deliveryMode": "unspecified",
    "types": [],
    "links": [],
    "notes": [],
    "source": {
      "recordNumber": 101,
      "sourceLine": 355
    }
  }
] satisfies Talk[];

export const plenaryAndKeynoteTalks = talks.filter((talk) =>
	talk.types.includes('plenary') || talk.types.includes('keynote'),
);

export const invitedTalks = talks.filter((talk) => talk.types.includes('invited'));
