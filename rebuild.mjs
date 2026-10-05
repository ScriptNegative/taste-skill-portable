import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Reproducible packaging only. No network requests or package installation.
const root = path.dirname(fileURLToPath(import.meta.url));
const skill = path.join(root, 'skills', 'design-taste-frontend-portable');
const manifestPath = path.join(skill, 'upstream.json');
const expectedHash = 'fc6760a09148f089f8c9343ef6869081817f1555de40872335a4927d2a790154';
const commit = '3c7017d636c3a4aad378433ea6d0cfa6c921da4a';
const sha = text => crypto.createHash('sha256').update(text, 'utf8').digest('hex');
const bytes = text => Buffer.byteLength(text, 'utf8');
const args = process.argv.slice(2);
const checking = args.length === 1 && args[0] === '--check';
if (!checking && !(args.length === 2 && args[0] === '--input')) {
  console.error('Usage: node rebuild.mjs --check | --input /path/to/original-SKILL.md');
  process.exit(1);
}

function sections(source) {
  // Split only at headings OUTSIDE fenced code blocks. Never normalize source.
  const lines = source.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  let fence = null;
  let chunk = '';
  let title = 'Original frontmatter and scope';
  const chunks = [];
  for (const line of lines) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)/);
    if (marker) {
      if (!fence) fence = { char: marker[1][0], length: marker[1].length };
      else if (marker[1][0] === fence.char && marker[1].length >= fence.length && marker[2].trim() === '') fence = null;
    }
    const heading = !fence && line.match(/^## (\d+\. .+|Appendix [A-Z] .+)\r?\n?$/);
    if (heading && chunk) {
      chunks.push({ title, content: chunk });
      chunk = '';
      title = heading[1].trim();
    }
    chunk += line;
  }
  if (chunk) chunks.push({ title, content: chunk });
  if (chunks.map(c => c.content).join('') !== source) throw new Error('Lossless splitting failed');
  if (chunks.some(c => bytes(c.content) >= 39000)) throw new Error('Reference exceeds safety budget; revise splitter');
  for (let n = 0; n <= 14; n++) {
    if (chunks.filter(c => c.title.startsWith(`${n}. `)).length !== 1) throw new Error(`Missing/duplicate section ${n}`);
  }
  for (const letter of ['A', 'B', 'C']) {
    if (chunks.filter(c => c.title.startsWith(`Appendix ${letter} `)).length !== 1) throw new Error(`Missing/duplicate appendix ${letter}`);
  }
  return chunks.map((c, i) => ({ ...c, file: `upstream-${String(i).padStart(2, '0')}.md` }));
}

function entry(chunks) {
  const required = chunks.filter(c => !c.title.startsWith('Appendix '));
  const optional = chunks.filter(c => c.title.startsWith('Appendix '));
  const links = list => list.map(c => `- [${c.title}](${c.file})`).join('\n');
  return `---
name: design-taste-frontend-portable
description: Taste Skill v2 experimental, losslessly modularized for Replit and other agents that can read bundled Markdown references. Use for landing pages, portfolios, public marketing pages, and visual redesigns. Preserves the brief, existing brand, and chosen stack. Not for dashboards, data tables, admin panels, multi-step product flows, or backend-only tasks.
license: MIT
metadata:
  version: "1.0.0"
  upstream-author: "Leonxlnx"
  upstream-commit: "${commit}"
---

# Taste Skill v2 Portable

Unofficial compatibility adaptation of [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). The complete original v2 experimental instructions are bundled verbatim. This is a small entry point, not a condensed substitute for v2. No particular client, palette, language, framework, hosting provider, or development approval process is built in.

## Load before designing

1. Confirm the task is in scope. For a dashboard, table, admin panel, configurator, or multi-step flow, use appropriate product-UI guidance; apply Taste only to any accompanying public marketing surfaces.
2. Read ALL core references below in order before making design decisions or writing code. Do not stop at this entry point or assume that a link was automatically loaded. The references are successive parts of one document; section numbers refer across files.
3. Read the appendices when choosing a design system, checking canonical documentation, or using their implementation examples. To read the entire original document, read the core references and all three appendices in the listed order.
4. If any required file cannot be read, name it, explain the limitation, and stop claiming that the full skill is active. Do not silently invent its contents or fall back to generic design advice.

## Core references (required)

${links(required)}

## Implementation appendices (load when applicable)

${links(optional)}

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

Upstream source commit: ${commit}. The original remains MIT licensed; see the bundled LICENSE and upstream.json. Concatenating every upstream-*.md in the manifest order reconstructs the original SKILL.md byte for byte. This is a versioned snapshot, not an automatically synchronized upstream installation.
`;
}

if (checking) {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  let reconstructed = '';
  const listed = new Set(manifest.files.map(f => f.file));
  const diskRefs = (await fs.readdir(skill)).filter(f => /^upstream-\d+\.md$/.test(f));
  if (diskRefs.length !== listed.size || diskRefs.some(f => !listed.has(f))) throw new Error('Unexpected/missing reference files');
  for (const file of manifest.files) {
    const content = await fs.readFile(path.join(skill, file.file), 'utf8');
    if (bytes(content) !== file.bytes || sha(content) !== file.sha256) throw new Error(`Corrupt reference: ${file.file}`);
    reconstructed += content;
  }
  if (sha(reconstructed) !== expectedHash || manifest.sha256 !== expectedHash) throw new Error('Upstream hash mismatch');
  const chunks = sections(reconstructed);
  const actual = await fs.readFile(path.join(skill, 'SKILL.md'), 'utf8');
  if (actual !== entry(chunks)) throw new Error('SKILL.md does not match reproducible build');
  if (bytes(actual) >= 39000 || actual.split('\n').length >= 500) throw new Error('Entry point exceeds skill size budget');
  const frontmatter = actual.match(/^---\n([\s\S]*?)\n---\n/)[1];
  const name = frontmatter.match(/^name: (.+)$/m)[1];
  const description = frontmatter.match(/^description: (.+)$/m)[1];
  if (name !== path.basename(skill) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64 || !description || description.length > 1024) throw new Error('Invalid skill metadata');
  for (const match of actual.matchAll(/\]\((upstream-\d+\.md)\)/g)) {
    if (!listed.has(match[1])) throw new Error(`Broken reference: ${match[1]}`);
  }
  await fs.access(path.join(skill, 'LICENSE'));
  console.log(`PASS: ${manifest.files.length} references; ${manifest.bytes} original bytes preserved; SKILL.md ${bytes(actual)} bytes; SHA-256 ${expectedHash}`);
} else {
  const source = await fs.readFile(path.resolve(args[1]), 'utf8');
  if (sha(source) !== expectedHash) throw new Error('Input is not the pinned upstream source. Review an upstream update before changing the pin.');
  const chunks = sections(source);
  await fs.mkdir(skill, { recursive: true });
  for (const c of chunks) await fs.writeFile(path.join(skill, c.file), c.content, 'utf8');
  await fs.writeFile(path.join(skill, 'SKILL.md'), entry(chunks), 'utf8');
  await fs.copyFile(path.join(root, 'LICENSE'), path.join(skill, 'LICENSE'));
  const manifest = {
    format: 1,
    upstream: 'https://github.com/Leonxlnx/taste-skill',
    source: `https://github.com/Leonxlnx/taste-skill/blob/${commit}/skills/taste-skill/SKILL.md`,
    commit,
    release: 'v2 experimental',
    license: 'MIT',
    packagingVersion: '1.0.0',
    bytes: bytes(source),
    lines: source.split('\n').length,
    sha256: expectedHash,
    files: chunks.map(c => ({ file: c.file, title: c.title, bytes: bytes(c.content), sha256: sha(c.content) }))
  };
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`Built ${chunks.length} lossless references. Run node rebuild.mjs --check.`);
}
