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

Do not push or deploy anything unless explicitly instructed.

Every change must be developed and tested locally first.

Before considering a feature complete:

1. Run the site on localhost.
2. Check the relevant page in desktop layout.
3. Check the relevant page in smartphone/mobile layout.
4. Run the relevant tests.
5. Run the production build locally with:

   npm run build

6. Fix all errors before proceeding.

Do not use the deployed website as a testing environment.

## Git

Do not run `git push` unless explicitly instructed.

Do not create commits unless explicitly instructed.

Do not modify unrelated files.

Before making substantial changes to an existing file, inspect its current
contents first.

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

## Content Principles

The site should present a highly active international researcher in an
understated way.

Show activity and academic standing through the actual material rather than
through boastful claims, counters, or promotional language.

Do not display publication-count or talk-count boast metrics.

Recurring academic content should use structured data whenever practical.

Avoid duplicated information. One academic object should have one canonical
source.

Publications will ultimately use BibTeX as the canonical source.

News should retain a personal and informal tone rather than generic university
PR language.

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
