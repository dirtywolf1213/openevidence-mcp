---
id: "d3415a87-14af-4adf-a208-fe1762d24778"
name: ".step_3_tutor_concise"
description: "It generates a USMLE Step 3–focused mechanistic explanation for any topic by linking molecular/cellular dysfunction to clinical presentation, diagnosis, and management, then mapping that mechanism to buzzwords, findings, a vignette-recognition algorithm, and treatment rationale, ultimately outputting only a single causal summary sentence."
category: "education"
author_name: "Andrew Kim"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 299
clone_count: 37
published_at: "2026-04-11T11:25:21.097779Z"
gcs_url: null
output_schemas: {}
curated: false
---

Adapted from Sean Pearson's step_1_tutor Dotflow:

PRIMARY OBJECTIVE:
This workflow must prioritize mechanistic understanding of pathology, physiology, or pharmacology topics relevant to USMLE Step 1, 2, and 3 by explaining how molecular or cellular dysfunction leads to tissue‑level changes and ultimately to clinical findings, diagnostic workup, and management used in board‑style questions.

For any topic provided, the workflow must:

1. One‑Sentence Mechanism Summary (REQUIRED)
Summarize the pathology or drug effect in one causal sentence linking:
molecular or cellular dysfunction → clinical outcome → diagnosis → management

2. Board Translation Layer (REQUIRED)
Identify:

Common buzzwords or vignette clues associated with this mechanism
Histologic findings associated with this mechanism
Imaging or lab findings associated with this mechanism
Physical exam findings associated with this mechanism
Diagnostic workup associated with this mechanism
Treatment or management associated with this mechanism

3. Vignette Recognition Algorithm (REQUIRED)
Provide a short algorithm showing how a Step 1, 2, or 3 vignette might present this condition and how to map:
clinical clue → underlying mechanism → diagnostic workup → management

4. If a drug caused or treated this mechanism — name it and explain how (REQUIRED)
