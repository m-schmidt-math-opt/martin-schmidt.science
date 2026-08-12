# Martin Schmidt Academic Website — Development Instructions

## Project

This repository contains the new academic website of Martin Schmidt,
Professor of Nonlinear Optimization at Trier University.

Technology:
- Astro
- TypeScript
- Static-first architecture
- Structured local content
- No CMS or database unless explicitly requested

## Development Workflow

Work step by step and make small, coherent changes.

Every change must be developed and tested locally first.

Before considering a feature complete:

1. Run the site on localhost.
2. Check the relevant page in desktop layout.
3. Check the relevant page at exactly 390px mobile width.
4. Run the relevant tests.
5. Run `npm run build` locally.
6. Run `git diff --check`.
7. Verify that affected pages have no horizontal overflow.

Fix all errors before proceeding.

Do not use the deployed website as a testing environment.

## Git

Do not commit, push, or deploy unless explicitly instructed by the user.

Do not modify unrelated files.

Before making substantial changes to an existing file, inspect its current
contents first.

Before any commit, relevant tests, the local production build, and relevant
desktop/mobile checks must pass.

## Factual Accuracy

Never invent factual academic content.

Stop and ask the user rather than guessing when a change depends on an unclear
date, uncertain classification, ambiguous person/project/publication/talk
mapping, unsupported affiliation, uncertain award or URL, unclear
current/historical status, or conflicting sources.

Do not silently “correct” source data from general knowledge.

## Canonical Data Sources

One fact = one canonical data source. Pages and components contain presentation
logic; they must not maintain parallel factual datasets.

- Publications: `src/data/publications.bib`
- Talks, plenaries, keynotes, and courses given as talks: `src/data/talks.ts`
- Research projects and funding metadata: `src/data/projects.ts`
- Supervised Bachelor’s and Master’s theses: `src/data/theses.ts`
- Current and former group members: `src/data/people.ts`
- Current teaching, teaching portfolio, and teaching resources: `src/data/teaching.ts`
- Software, benchmark libraries, and archived research resources: `src/data/resources.ts`
- About, profile, contact, career, and editorial data: `src/data/about.ts`
- Curated news: `src/data/news.ts`

If a fact already exists in a canonical source, derive it from there rather
than copying it into another data file or page. For example, About plenary
lists derive from `talks.ts`, homepage projects derive from `projects.ts`,
publication artifacts belong in `publications.bib`, alumni dissertation data
belongs in `people.ts`, and Teaching links to the thesis archive without
duplicating thesis records.

## Publications

`publications.bib` governs all publication facts. Do not duplicate
bibliographic metadata in TypeScript or page files.

Publication-specific code, data, source files, and repositories belong on the
relevant BibTeX record. Do not publish broken, dead, 404, generic, or unrelated
artifact links. Remove a stale link that no longer reaches its intended
resource unless the user explicitly asks to retain it, and never invent a
replacement URL.

## Talks

`talks.ts` is the only canonical source for talk facts and classifications. Do
not maintain parallel lists of plenary, keynote, invited, summer/winter-school,
or introductory-course events. Derived pages and About sections must use
`talks.ts`.

Do not infer contributed, invited, plenary, or other classifications from an
absence of metadata or vague prose.

## Projects

`projects.ts` is canonical for current and completed research projects.
Funding agencies, partners, programmes, roles, dates, and themes are attributes
of project records; do not create a parallel grants dataset. Leave unknown
project dates unset rather than guessing.

## Theses

`theses.ts` is canonical for supervised Bachelor’s and Master’s theses. The
site has one thesis archive page and no individual thesis detail pages unless
the user explicitly requests them later.

Explicitly deferred or incomplete metadata may remain unresolved. Never invent
missing thesis data, and do not duplicate thesis records in `teaching.ts`.

## People and Group

`people.ts` is canonical for current members, former PhD students, former
postdocs, research focus, portraits, dissertation titles, institutions,
co-supervision, dissertation awards, and verified current positions.

Current-member portraits may be stored locally. Alumni remain text-only unless
the user explicitly changes that decision. Do not publish phone numbers, room
numbers, or office hours unless explicitly requested.

## Software and Data

`resources.ts` is canonical for standalone software, data, and resource
objects. Preserve this editorial hierarchy:

- BOBILib is featured, current, and highly visible.
- GasLib is current and prominent.
- LaMaTTO++, the Diophantine implementation, and the CrypTool 2 integration
  belong in the Archive.
- Robust electricity-market instances were intentionally removed and must not
  be reintroduced unless explicitly requested.

Publication-specific code or data does not automatically become a Software &
Data resource.

## Teaching

Preserve this structure:

1. Current Teaching
2. Teaching Portfolio
3. Lecture Notes & Resources
4. Past Courses

Old downloadable lecture-note PDFs are intentionally not public unless
explicitly reintroduced. Old Bachelor’s/Master’s thesis-topic PDFs are
intentionally excluded. Teaching may link to the thesis archive but must not
duplicate its data.

## News

Historical News parity with the old Squarespace site is not required.
`news.ts` contains only curated/current News intended for the new site. Missing
old News announcements are not migration defects. News should retain a
personal, informal tone rather than generic university PR language.

## About and Profile

Keep the About page concise and research-oriented. No current CV is available,
so do not display a placeholder CV link.

Phone, office room, office hours, and a full reviewer list are intentional
exclusions. Reviewer-journal examples must be supported by a source; never add
prestige-driven claims or journals from memory.

## External Links

Do not publish broken links, 404s, generic redirects that no longer reach the
intended resource, or guessed replacement URLs. Check migrated links where
practical and prefer removing a stale, useless URL over preserving it solely
for historical provenance.

## Design

The site is research-first.

Visual direction:
- light mode only
- warm off-white background
- near-black text
- deep petrol/teal accent
- contemporary academic/editorial design
- serif headings and clean sans-serif body text
- generous whitespace
- thin rules and restrained cards
- subtle optimization-inspired geometric elements
- minimal animation
- no gradients
- no decorative equations
- no dark mode

The site must work well on smartphones, tablets, and desktops.

Portraits should remain secondary and must not dominate the homepage hero.

## Content Principles

The site should present active academic work in an understated way. Show
activity and standing through actual publications, talks, projects,
software/data, awards, and editorial roles rather than boastful claims,
counters, or promotional language.

Do not display publication-count or talk-count boast metrics.

Avoid unsupported descriptions such as “world-leading,” “top-notch,” or
“highly renowned” unless explicitly requested and factually supported.

## Content Preservation

Never delete, drop, hide, or otherwise lose existing content during redesign or
refactoring unless the user explicitly requests deletion. Content may move
between sections, but it must remain represented. Ask before removing content
that appears redundant or obsolete when deletion was not requested.

## Uniform Presentation Patterns

When introducing a recurring presentation or navigation pattern on a major
page, check analogous pages and implement it consistently through shared
components or styles where appropriate. Avoid unnecessary page-specific
variants of the same interface pattern.

## Intentional Exclusions

Do not casually reintroduce old-site content that was intentionally excluded.
Before treating an absence as a migration defect, determine whether the item
was intentionally removed, superseded, archived, or deliberately left
unresolved.

Keep this rulebook focused on persistent project-wide rules. Do not add one-off
task instructions, temporary fixes, or transient content decisions unless they
establish a lasting rule.

## SEO

SEO is a first-class requirement for every feature, not something added later.

Use:
- semantic HTML
- logical heading structure
- clean URLs
- page-specific titles and descriptions
- canonical URLs
- strong internal linking
- accessible markup
- static rendering wherever possible
- excellent performance

Do not introduce client-side JavaScript unless it provides a clear benefit.

## Astro Documentation

Full documentation:
https://docs.astro.build

Consult the relevant Astro documentation when necessary, especially for:
- routing
- components
- content collections
- styling
- SEO
