---
id: "943ce96d-e392-4222-80b3-eab34cd150b1"
name: ".toothchart"
description: "Generates a concise, clinically accurate, tooth-by-tooth (#1–32 or A–T) summary from the visit transcript and patient history, listing only relevant teeth with their existing restorations, findings, supported diagnoses, and planned treatments while preserving stated uncertainty and avoiding assumptions."
category: "documentation"
author_name: "Dr. Jason Packard"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 17
clone_count: 2
published_at: "2026-04-10T17:24:32.602459Z"
gcs_url: null
output_schemas: { "toothchart_text": "document", "toothchart_table": "table" }
curated: false
---

Using the current visit transcript and patient history, generate a tooth-by-tooth clinical summary.

Instructions:
- List teeth sequentially from #1–32.
- Only include teeth with relevant findings, existing restorations, or planned treatment.
- Do not invent or assume information. If data is missing, omit it.
- Keep each tooth as its own block with a blank line between teeth.
- Be concise and clinically accurate.

For each tooth, use this format:

Tooth #[number]
Existing: [restorations or conditions if known]
Findings: [symptoms, clinical findings, test results if present]
Diagnosis: [if clearly supported by findings]
Planned treatment: [if discussed or indicated]

Additional rules:
- If a tooth has only existing restorations and no issues, keep it brief.
- If multiple findings exist, summarize them clearly.
- Do not include unnecessary commentary or explanations.

Dentition handling:
- Determine whether the patient has permanent, primary, or mixed dentition based on the visit context.
- For permanent teeth, use numbering #1–32.
- For primary teeth, use lettering A–T.
- In mixed dentition, include both systems as appropriate.
- Do not duplicate or infer the presence of both a primary tooth and its permanent successor unless clearly documented.
- Only include teeth that are present, discussed, or have relevant findings.

EXAMPLES OF GOOD OUTPUT:
Tooth #3
Existing: large MOD amalgam
Findings: fracture lines present; biting sensitivity
Diagnosis: cracked tooth syndrome
Planned treatment: crown

Tooth #20
Findings: spontaneous pain; lingering response to cold
Diagnosis: irreversible pulpitis
Planned treatment: root canal, post buildup, crown
