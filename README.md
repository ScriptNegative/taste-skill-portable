# Taste Skill v2 Portable

A small entry point with the **complete Taste Skill v2 experimental instructions**, packaged for Replit and other agents that support local skill references.

Unofficial adaptation maintained by [ScriptNegative](https://github.com/ScriptNegative). Original design guidance by [Leonxlnx](https://github.com/Leonxlnx/taste-skill), MIT licensed. This is not an official upstream release and does not claim to improve the upstream design rules.

## What changes

- The original 87,252-byte `SKILL.md` is split at real section boundaries into individually readable Markdown references. No original content is summarized or removed.
- A compact `SKILL.md` explicitly tells the agent what to load and what to do if references are unavailable. Every packaged file stays below 39,000 bytes, leaving margin under the 40 KB limit observed in Replit's GitHub skill importer.
- Universal project safeguards preserve the client's brand, chosen stack and approval gates. PHP projects stay PHP; React projects can stay React. There are no client-specific rules.
- A distinct install name, `design-taste-frontend-portable`, avoids silently replacing the original. Enable only one Taste version for a given task to avoid duplicated instructions.
- A manifest and a dependency-free Node.js check verify every reference and reconstruct the original SHA-256 hash.

**Same source does not guarantee identical outputs.** Skills are instructions followed by a model, not deterministic executable plugins. The default loading route reads every core section (0-14); appendices are available when relevant. Read all references to load the entire original document. Loading all of v2 still uses approximately the original amount of context. This adaptation reduces entry-point size and fixes packaging compatibility, not the total amount of guidance.

The upstream version is explicitly **experimental**. This package is a pinned snapshot; upstream changes are not pulled automatically.

## Install in Replit

Open **Settings → Customization → Skills → Add → Add from GitHub**. Paste this folder URL:

```text
https://github.com/ScriptNegative/taste-skill-portable/tree/main/skills/design-taste-frontend-portable
```

Select **Preview skills**, choose `design-taste-frontend-portable`, then import it and enable it. Workspace installation makes it reusable across projects; project-local installation applies only to that project. Keep all bundled reference files with `SKILL.md`.

For a manual project install, copy the entire `skills/design-taste-frontend-portable` directory into `.agents/skills/`. Other agents may use a different skills directory: follow their current documentation and copy the complete folder, not just the entry point.

If the importer reports a valid structure, that validates the package layout only. In a chat, ask the agent to load the skill and list the core reference files it actually read. An agent that cannot access those files cannot use the full adaptation.

## Use it

```text
Use design-taste-frontend-portable for this landing page. Read every core reference before designing. Preserve our existing logo, brand palette and chosen stack. Follow the project's scope and approval gates. Explain the design direction, then run the Section 14 pre-flight check and report what you actually verified.
```

Use it for landing pages, portfolios, public marketing pages and appropriate visual redesigns. It does not become a dashboard, table, admin-panel, checkout or multi-step-configurator specialist simply because it is modular. Other skills may complement it, but none are required by this package.

## Validate or rebuild

Node.js 18 or newer is sufficient. No npm dependencies, network calls or installation are required by the script.

```sh
node rebuild.mjs --check
node rebuild.mjs --input /path/to/pinned-original-SKILL.md
node rebuild.mjs --check
```

The build rejects any input whose hash differs from the reviewed upstream snapshot. To update, first review the upstream changes, then deliberately update the source pin and hash, rebuild and run the check. Commit the script, manifest, entry point and all references together. Do not mix reference files from different revisions.

The packaged original uses LF line endings. Preserve them: line-ending conversion changes the integrity hash. See `.gitattributes`.

## En español

Esta adaptación conserva todo el texto original de Taste v2, dividido en archivos. El archivo de entrada es pequeño y compatible con el límite observado en Replit. Puede reutilizarse con distintos clientes y tecnologías; las reglas de cada proyecto tienen prioridad.

No garantiza diseños idénticos ni un ahorro de contexto cuando se lee toda v2. La compatibilidad del formato debe distinguirse de una prueba del comportamiento real del agente. Instala la carpeta completa usando el enlace anterior y mantén activada una sola versión de Taste por tarea.

## License and attribution

Original content: Copyright (c) 2026 Leonxlnx, MIT. See `LICENSE`, also bundled inside the skill so attribution survives standalone import. The packaging, validation script and additional general instructions are provided under the same MIT terms. Upstream author retains credit for the design guidance.

Sources: [Taste Skill](https://github.com/Leonxlnx/taste-skill), [Agent Skills specification](https://agentskills.io/specification), [Replit Agent Skills documentation](https://docs.replit.com/features/agent/skills).
