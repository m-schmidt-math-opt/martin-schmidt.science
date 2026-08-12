export type ThesisDegree = 'bachelor' | 'master';

export interface Thesis {
	id: string;
	degree: ThesisDegree;
	title: string;
	student: string;
	institution: string;
	year: number;
	coSupervisor?: string;
	award?: string;
	note?: string;
}

// Bachelor-thesis institutions were verified directly by the site owner.
export const theses: Thesis[] = [
	{ id: 'master-ernzerhoff-2025', degree: 'master', title: 'Robust Support Vector Machines', student: 'Florian Ernzerhoff', institution: 'Trier University', year: 2025 },
	{ id: 'master-ostroman-2025', degree: 'master', title: 'A Multilevel Optimization Model for Regulatory Uncertainties with Applications in the Energy Sector', student: 'Arianna Ostroman', institution: 'Trier University and Università a degli Studi di Milano', year: 2025 },
	{ id: 'master-dubrova-2025', degree: 'master', title: 'Solving Single-Leader-Multi-Disjoint-Follower Bilevel Problem Using a Penalty Alternating Direction Method', student: 'Alexandra Dubrova', institution: 'Trier University', year: 2025 },
	{ id: 'master-schmitt-2025', degree: 'master', title: 'Optimierung der Lagerverplanung der AG der Dillinger Hüttenwerke: Modellierungsansätze und Vergleich von Solvern', student: 'Anna Schmitt', institution: 'Trier University', year: 2025 },
	{ id: 'master-popa-2025', degree: 'master', title: 'Fortification Games For DC Power Flow Networks', student: 'Madleen-Maria Popa', institution: 'Trier University', year: 2025 },
	{ id: 'master-leuck-2025', degree: 'master', title: 'Γ-Robust Interdiction Problems with an Application to Knapsack Interdiction Problems', student: 'Anna-Sophia Leuck', institution: 'Trier University', year: 2025 },
	{ id: 'master-thielen-2025', degree: 'master', title: 'Optimale Produktionsplanung in einem Stahlwerk mit einem Elektrolichtbogenofen', student: 'Marius Thielen', institution: 'Trier University', year: 2025 },
	{ id: 'master-metzler-2024', degree: 'master', title: 'Optimising Interdiction Strategies A Computational Analysis Using KKT Single-Level Reformulation', student: 'Björn Metzler', institution: 'Trier University', year: 2024 },
	{ id: 'master-bala-2024', degree: 'master', title: 'Robust Optimization of Classification using Support Vector Machine', student: 'Manju Bala', institution: 'Trier University', year: 2024 },
	{ id: 'master-stevens-2024', degree: 'master', title: 'Bilevel Techniques in Robust Optimization with Decision-Dependent Uncertainties', student: 'Simon Stevens', institution: 'Trier University', year: 2024 },
	{ id: 'master-kappelmann-2024', degree: 'master', title: 'Optimierung abs-linearer Probleme', student: 'Florian Kappelmann', institution: 'Trier University', year: 2024 },
	{ id: 'master-schumann-2023', degree: 'master', title: 'Empowering Homes. A bottom-up approach to improving self-sufficiency through optimised electricity management in photovoltaic-based household networks', student: 'Nico Schumann', institution: 'Trier University', year: 2023 },
	{ id: 'master-wolf-2023', degree: 'master', title: 'Extending Market Equilibrium Theory for Electricity Markets with Convex and Nonconvex Player Problems', student: 'Angelina Wolf', institution: 'Trier University', year: 2023 },
	{ id: 'master-mergen-2023', degree: 'master', title: 'Algorithms for Pessimistic Bilevel Optimization', student: 'Michelle Mergen', institution: 'Trier University', year: 2023 },
	{ id: 'master-goetz-2023', degree: 'master', title: 'ADMM als Lösungsverfahren für Gleichgewichtsprobleme in Strommärkten mit großem Zeithorizont', student: 'Florian Götz', institution: 'Trier University', year: 2023 },
	{ id: 'master-burdjak-2022', degree: 'master', title: 'Continuous Reformulations of Mixed-Integer Nonlinear Optimization Problems', student: 'Rachel Burdjak', institution: 'Trier University', year: 2022 },
	{ id: 'master-yigit-2022', degree: 'master', title: 'Implementation of Cluster Graph Optimization Problems on Quantum Computers', student: 'Mehmet Yigit', institution: 'Trier University', year: 2022 },
	{ id: 'master-walter-2022', degree: 'master', title: 'Betrachtung der Standard-Version pessimistischer Bilevel-Probleme', student: 'Maximilian Walter', institution: 'Trier University', year: 2022 },
	{ id: 'master-reudelsterz-2022', degree: 'master', title: 'Gleichgewichte von Verkehrsnetzen', student: 'Lisa Reudelsterz', institution: 'Trier University', year: 2022 },
	{ id: 'master-molan-2022', degree: 'master', title: 'Using neural networks to solve linear bilevel problems with unknown lower-level problems', student: 'Ioana Molan', institution: 'Trier University', year: 2022 },
	{ id: 'master-horlaender-2022', degree: 'master', title: 'Eine Penalty Branch-and-Bound Methode für gemischt-ganzzahlige Bilevel-Probleme', student: 'Andreas Horländer', institution: 'Trier University', year: 2022 },
	{ id: 'master-bintz-2022', degree: 'master', title: 'Pivot-Methoden für lineare Komplementaritätsprobleme', student: 'Simon Bintz', institution: 'Trier University', year: 2022 },
	{ id: 'master-schaefer-2022', degree: 'master', title: 'Eindeutigkeit von Marktgleichgewichten auf Netzwerken mit Transportkosten und physikalischen Restriktionen', student: 'Thomas Schäfer', institution: 'Trier University', year: 2022 },
	{ id: 'master-borchers-2021', degree: 'master', title: 'Hinreichende Matrizen und das lineare Komplementaritätsproblem', student: 'Soeren Borchers', institution: 'Trier University', year: 2021 },
	{ id: 'master-beck-2020', degree: 'master', title: 'Begrenzte Rationalität in der Bilevel Optimierung mithilfe Robuster Optimierung', student: 'Yasmine Beck', institution: 'Trier University', year: 2020 },
	{ id: 'master-auer-2020', degree: 'master', title: 'Ein- und Mehrdeutigkeit von Lösungen linearer Komplementaritätsprobleme', student: 'Alexander Auer', institution: 'Trier University', year: 2020 },
	{ id: 'master-pesch-2020', degree: 'master', title: 'Existenz und Eindeutigkeit von Bi-Matrix-Spielen', student: 'Sebastian Bernhard Pesch', institution: 'Trier University', year: 2020 },
	{ id: 'master-winkler-2019', degree: 'master', title: 'Existenz von Nash-Gleichgewichten bei nichtkonvexen Spielen', student: 'Tobias Winkler', institution: 'Trier University', year: 2019 },
	{ id: 'master-spaeth-2019', degree: 'master', title: 'A parallel penalty based approach for solving quasi-separable optimization problems on example of gas networks', student: 'Max Späth', institution: 'Trier University', year: 2019 },
	{ id: 'master-arndt-2019', degree: 'master', title: 'Γ-robuste Spieltheorie', student: 'Simone Arndt', institution: 'FAU Erlangen-Nuremberg', year: 2019 },
	{ id: 'master-mueller-2019', degree: 'master', title: 'Γ-robust linear complementarity problems under ellipsoidal uncertainty with application to the traffic equilibrium problem', student: 'Michael Müller', institution: 'FAU Erlangen-Nuremberg', year: 2019 },
	{ id: 'master-kessler-2019', degree: 'master', title: 'Optimale Zieltemperatursteuerung - adaptiv diskretisierte flussbasierte thermische Gebäudemodellierung und Simulation', student: 'Simon Keßler', institution: 'Trier University', year: 2019 },
	{ id: 'master-kronhardt-2019', degree: 'master', title: 'Kosteneffizienter Betrieb von Smart Grids mit Gomory Schnittebenen', student: 'Annemarie Kronhardt', institution: 'FAU Erlangen-Nürnberg', year: 2019 },
	{ id: 'master-kempke-2019', degree: 'master', title: 'Mixed-integer Sequential Quadratic Programming for Optimal Electrical Vehicle Charging', student: 'Nils-Christian Kempke', institution: 'FAU Erlangen-Nuremberg', year: 2019 },
	{ id: 'master-kistner-2018', degree: 'master', title: 'Bilevelproblem des europäischen Gasmarktes aktuelle Planung', student: 'Michael Kistner', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-deuschel-2018', degree: 'master', title: 'Mixed integer moving horizon control for flexible energy storage systems', student: 'Jessica Deuschel', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-seith-2018', degree: 'master', title: 'Ein Moving-Horizon-Ansatz für mehrstufige stochastische Portfolio-Optimierung mit langfristigen und illiquiden Infrastrukturinvestitionen', student: 'Benjamin Seith', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-kramer-2018', degree: 'master', title: 'Robustifizierungen von Gleichgewichtsproblemen im Strommarkt', student: 'Anja Kramer', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-wolfsteller-2018', degree: 'master', title: 'Multikriterielle Optimierung für Graphenzerlegung bei potentialgetriebenen Flüssen', student: 'Dörte Wolfsteller', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-brose-2018', degree: 'master', title: 'Graphpartitionierungen für Alternating Direction Methods mit Anwendungen auf Gasnetze', student: 'Alexander Brose', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'master-krebs-2017', degree: 'master', title: 'On the uniqueness of competitive market equilibria on DC networks', student: 'Vanessa Krebs', institution: 'FAU Erlangen-Nuremberg', year: 2017 },
	{ id: 'master-kleinert-2016', degree: 'master', title: 'A Decomposition Approach for a Multilevel Graph Partitioning Model of the German Electricity Market', student: 'Thomas Kleinert', institution: 'FAU Erlangen-Nuremberg', year: 2016 },

	{ id: 'bachelor-brachtendorf-2022', degree: 'bachelor', title: 'Spieltheoretische Betrachtung von supply chain Netzwerken unter Arbeitsbeschränkungen', student: 'Jonas Brachtendorf', institution: 'Trier University', year: 2022 },
	{ id: 'bachelor-orio-2022', degree: 'bachelor', title: 'Praktischer sowie theoretischer Vergleich des primalen und dualen Simplex', student: 'Tim Orio', institution: 'Trier University', year: 2022 },
	{ id: 'bachelor-maier-2021', degree: 'bachelor', title: 'Flüsse und Schnitte in Netzwerken - Algorithmen im Vergleich', student: 'Stefan Maier', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-stevens-2021', degree: 'bachelor', title: 'Robuste Portfoliooptimierung', student: 'Simon Stevens', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-moench-2021', degree: 'bachelor', title: 'Lineare Komplementaritätsprobleme mit hinreichenden und copositiven Matrizen', student: 'Marius Mönch', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-kappelmann-2021', degree: 'bachelor', title: 'Der Lemke-Algorithmus', student: 'Florian Kappelmann', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-samarkhanova-2021', degree: 'bachelor', title: 'Line-Search Filter Methoden für nichtlineare Programmierung', student: 'Yana Samarkhanova', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-podceka-2021', degree: 'bachelor', title: 'Trust-Region Methoden', student: 'Alina Podceka', institution: 'Trier University', year: 2021 },
	{ id: 'bachelor-folz-2020', degree: 'bachelor', title: 'Lineare Komplementaritätsprobleme in Nash-Cournot Gleichgewichtsmodellen für Strommärkte', student: 'Simon Folz', institution: 'Trier University', year: 2020 },
	{ id: 'bachelor-backes-2020', degree: 'bachelor', title: 'Lineare Optimierung im Schulunterricht', student: 'Lena Ulrike Backes', institution: 'Trier University', year: 2020 },
	{ id: 'bachelor-scherer-2020', degree: 'bachelor', title: 'Bi-Matrixspiele und lineare Komplementaritätsprobleme', student: 'Jannis Scherer', institution: 'Trier University', year: 2020 },
	{ id: 'bachelor-horlaender-2020', degree: 'bachelor', title: 'Splitting-Methoden für lineare Komplementaritätsprobleme', student: 'Andreas Horländer', institution: 'Trier University', year: 2020 },
	{ id: 'bachelor-goetz-2020', degree: 'bachelor', title: 'Trust-Region Methoden', student: 'Florian Götz', institution: 'Trier University', year: 2020 },
	{ id: 'bachelor-jordan-2020', degree: 'bachelor', title: 'Modellierung, Existenz und Eindeutigkeit von Nash-Cournot-Gleichgewichten auf Netzwerken', student: 'Julia Jordan', institution: 'FAU Erlangen-Nuremberg', year: 2020 },
	{ id: 'bachelor-plank-2018', degree: 'bachelor', title: 'Eindeutigkeit von Nash–Cournot-Gleichgewichten auf Netzwerken', student: 'Martin Plank', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'bachelor-bauer-2018', degree: 'bachelor', title: 'A Heuristic for Linear Bilevel Problems based on Penalty Alternating Direction Methods', student: 'Sarah June Bauer', institution: 'FAU Erlangen-Nuremberg', year: 2018 },
	{ id: 'bachelor-mueller-2016', degree: 'bachelor', title: 'Primalheuristiken für Graphpartitionierungsprobleme mit Zusammenhangsbedingungen mit Anwendungen in Strommarktmodellen', student: 'Michael Müller', institution: 'FAU Erlangen-Nuremberg', year: 2016 },
	{ id: 'bachelor-brose-2015', degree: 'bachelor', title: 'Vergleich verschiedener IP-/MIP-Formulierungen für das Graphpartitionierungsproblem', student: 'Alexander Brose', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-wolfsteller-2015', degree: 'bachelor', title: 'Matroide und der Greedy-Algorithmus', student: 'Dörte Wolfsteller', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-boelcke-2015', degree: 'bachelor', title: 'Innere-Punkte-Methoden für unzulässige lineare Optimierungsprobleme', student: 'Janina Boelcke', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-beer-2015', degree: 'bachelor', title: 'Mathematische Dualitätstheorie in ökonomischen Strommarktmodellen', student: 'Rebecca Beer', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-lieb-2015', degree: 'bachelor', title: 'Mehrgüterfluss-Modellierung des Gasnetzwerkes mit Schwerpunkt Leistungsberechnung', student: 'Anna Lieb', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-weinmueller-2015', degree: 'bachelor', title: 'Edmonds Matching Algorithmus für gewichtete Graphen', student: 'Pascal Weinmüller', institution: 'FAU Erlangen-Nuremberg', year: 2015 },
	{ id: 'bachelor-graebner-2014', degree: 'bachelor', title: 'Regularisierungsverfahren für Optimierungsprobleme mit Komplementaritätsbedingungen', student: 'Jonas Gräbner', institution: 'FAU Erlangen-Nuremberg', year: 2014 },
];

export const masterTheses = theses.filter((thesis) => thesis.degree === 'master');
export const bachelorTheses = theses.filter((thesis) => thesis.degree === 'bachelor');
