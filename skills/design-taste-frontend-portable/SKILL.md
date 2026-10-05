---
name: design-taste-frontend-portable
description: Taste Skill v2 experimental, losslessly modularized for Replit and other agents that can read bundled Markdown references. Use for landing pages, portfolios, public marketing pages, and visual redesigns. Preserves the brief, existing brand, and chosen stack. Not for dashboards, data tables, admin panels, multi-step product flows, or backend-only tasks.
license: MIT
metadata:
  version: "1.0.0"
  upstream-author: "Leonxlnx"
  upstream-commit: "3c7017d636c3a4aad378433ea6d0cfa6c921da4a"
---

# Taste Skill v2 Portable

Unofficial compatibility adaptation of [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). The complete original v2 experimental instructions are bundled verbatim. This is a small entry point, not a condensed substitute for v2. No particular client, palette, language, framework, hosting provider, or development approval process is built in.

## Load before designing

1. Confirm the task is in scope. For a dashboard, table, admin panel, configurator, or multi-step flow, use appropriate product-UI guidance; apply Taste only to any accompanying public marketing surfaces.
2. Read ALL core references below in order before making design decisions or writing code. Do not stop at this entry point or assume that a link was automatically loaded. The references are successive parts of one document; section numbers refer across files.
3. Read the appendices when choosing a design system, checking canonical documentation, or using their implementation examples. To read the entire original document, read the core references and all three appendices in the listed order.
4. If any required file cannot be read, name it, explain the limitation, and stop claiming that the full skill is active. Do not silently invent its contents or fall back to generic design advice.

## Core references (required)

- [Original frontmatter and scope](upstream-00.md)
- [0. BRIEF INFERENCE (Read the Room Before Anything Else)](upstream-01.md)
- [1. THE THREE DIALS (Core Configuration)](upstream-02.md)
- [2. BRIEF → DESIGN SYSTEM MAP](upstream-03.md)
- [3. DEFAULT ARCHITECTURE & CONVENTIONS](upstream-04.md)
- [4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)](upstream-05.md)
- [5. CONTEXT-AWARE PROACTIVITY](upstream-06.md)
- [6. PERFORMANCE & ACCESSIBILITY GUARDRAILS](upstream-07.md)
- [7. DIAL DEFINITIONS (Technical Reference)](upstream-08.md)
- [8. DARK MODE PROTOCOL](upstream-09.md)
- [9. AI TELLS (Forbidden Patterns)](upstream-10.md)
- [10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)](upstream-11.md)
- [11. REDESIGN PROTOCOL](upstream-12.md)
- [12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)](upstream-13.md)
- [13. OUT OF SCOPE](upstream-14.md)
- [14. FINAL PRE-FLIGHT CHECK](upstream-15.md)

## Implementation appendices (load when applicable)

- [Appendix A - Install Commands per Design System](upstream-16.md)
- [Appendix B - Canonical Sources (read these before reinventing)](upstream-17.md)
- [Appendix C - Apple Liquid Glass: Honest Web Approximation](upstream-18.md)

## Project requirements take priority

- Follow explicit user instructions, project documentation, approved brand assets, and the selected stack over upstream defaults. Audit an existing site before a redesign; preserve its recognizable identity unless a change is requested.
- React/Next.js, Tailwind, Motion, GSAP, colors, dials and design systems in the original are conditional choices or examples. Do not migrate the stack, add a Node server, remove a brand color, or add dependencies just to follow an example. Adapt applicable design principles to PHP templates, HTML/CSS/JavaScript, React, Vue, or the project's actual technology.
- Follow the project's scope and approval gates. This skill never authorizes backend work, deployment, external account changes, purchases, or publication by itself.
- Keep examples, mock data and placeholders clearly distinguishable from real client claims. Do not invent testimonials, statistics, pricing, certifications or partner logos as factual content.
- Keep accessibility, keyboard operation, contrast, responsiveness, reduced motion and performance ahead of aesthetic effects. Every animation needs a purpose.
- Other design skills are optional. Coordinate their relevant guidance against the brief rather than forcing conflicting aesthetics or assuming those skills are installed.

## Delivery check

Run the original Section 14 pre-flight check. Mark stack-specific or genuinely irrelevant items as not applicable with a reason, rather than adding an unnecessary feature or pretending it was tested. Report actual visual/functional checks performed and remaining limitations. A valid import proves structure, not design quality or identical model behavior.

## Provenance

Upstream source commit: 3c7017d636c3a4aad378433ea6d0cfa6c921da4a. The original remains MIT licensed; see the bundled LICENSE and upstream.json. Concatenating every upstream-*.md in the manifest order reconstructs the original SKILL.md byte for byte. This is a versioned snapshot, not an automatically synchronized upstream installation.
