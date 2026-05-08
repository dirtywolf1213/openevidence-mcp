---
id: "c6c81e56-0fdf-4565-b8e6-b771cd5896e7"
name: ".toothchart_text"
description: "Generates a concise tooth-by-tooth clinical note from the current visit transcript and patient history in Dentrix-compatible plain text, one self-contained line per relevant tooth using standardized dental abbreviations and omitting missing or redundant fields."
category: "documentation"
author_name: "Dr. Jason Packard"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 2
clone_count: 0
published_at: "2026-04-10T18:45:10.513728Z"
gcs_url: null
output_schemas: {}
curated: false
---

Using the current visit transcript and patient history, generate a tooth-by-tooth clinical summary in Dentrix-compatible plain text format.

OUTPUT REQUIREMENTS:
- Plain text only (no tables, no formatting, no bold, no symbols)
- One tooth per line
- Each line must be self-contained and easy to copy/paste into Dentrix
- Do NOT include introductory text

FORMAT:
Tooth #[number]: Existing [if present]; Findings [if present]; Diagnosis [if needed]; Plan [if present]

CONTENT RULES:
- Only include teeth with relevant findings, restorations, treatment, or missing status
- If a tooth is missing, output only: "Tooth #[number]: Missing"
- Do NOT include fields that have no information (no "None")
- Do NOT repeat redundant information (e.g., do not include "Diagnosis Caries" if findings already state caries)

CLINICAL LANGUAGE RULES:
- Keep wording concise and clinical
- Preserve uncertainty exactly as stated (e.g., "possible", "monitor", "incipient")

ABBREVIATION RULES (use consistently):
- Interproximal = IP
- Mesial = M, Distal = D, Occlusal = O, Lingual = L, Buccal/Facial = B
- Composite = cp, Amalgam = am
- Patient = pt
- Upper/Lower + Right/Left = UR, UL, LR, LL
- Radiographic/Clinical/Transillumination finding = (R)/(Clin)/(CariVu)
- Negative = -
- Positive = +
- Lingering/Non-Lingering/No Response = L/NL/NR
- Non-Restorable / Non-Salvageable = NS
- Clinical finding may be left unlabeled or noted if clear

STYLE RULES:
- Prefer shorthand phrasing (e.g., "IP caries (R)" instead of "interproximal caries radiographically")
- Use "+" for positive findings where appropriate (e.g., "+explorer")
- Keep each line as short as possible while preserving meaning
- Target concise, fast-scanning clinical shorthand suitable for real-time charting

EXAMPLES:

Tooth #3: Findings IP caries (R); pt reports mild R sensitivity; Plan MO cp; monitor D

Tooth #9: Existing MIFL cp; Findings small M defect, no active decay; Diagnosis restorative defect; Plan monitor

Tooth #31: Existing defective O cp over am; Findings leaking; +explorer; Diagnosis failing restoration; Plan replace O cp/am
