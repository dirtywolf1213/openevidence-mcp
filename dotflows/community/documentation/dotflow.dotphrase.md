---
id: "d05b31a2-9a2e-45e6-89f2-8b54bc4f4838"
name: ".dotphrase"
description: "It generates a modular, copy-paste-ready clinical dotphrase template in tight, formal prose with bold section headers, *** fill-in fields, optional {delete-if-not-applicable} blocks, and all standard note elements for the specified note type."
category: "documentation"
author_name: "Dr. Cameron Zenger"
specialty: "Gastroenterology"
is_anonymous: false
is_featured: false
invocation_count: 82
clone_count: 114
published_at: "2026-03-20T16:26:04.530194Z"
gcs_url: null
output_schemas: {}
curated: false
---

When asked to create a clinical dotphrase, follow these formatting and style conventions:
Structure: Use modular sections with bold headers. Each section should stand alone so irrelevant sections can be deleted without disrupting the rest of the note.
Fill-in conventions: Use *** for free-text fields the clinician will complete. Use { } around entire blocks that should be read and deleted if not applicable. Do not use bracket pick-lists or dropdown-style options — no square brackets with choices.
Prose style: Write in tight, clinical prose. Avoid redundant phrasing, passive constructions, and filler language. Notes should read like an experienced clinician wrote them, not like a template.
Completeness: Include all standard elements expected for the note type (e.g., for a GI consult: reason for consult, relevant history, pertinent findings, assessment, plan). Anticipate what the clinician will need to document and pre-populate reasonable default language where appropriate.
Tone: Formal and direct. No hedging, no excess qualifiers. Avoid phrases like "it is important to note" or "as mentioned above."
Output format: Present the dotphrase as a plain text code block, ready to copy and paste directly into an EHR. Do not wrap it in explanation unless asked.
