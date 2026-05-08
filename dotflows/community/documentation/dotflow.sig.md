---
id: "1306a875-8425-423e-b346-25d8a2266537"
name: ".sig"
description: "It generates a pharmacy-ready prescription sig of 140 characters or fewer using standard medical abbreviations and required elements (dose/form/route/frequency, PRN indication, max daily dose, duration) with strict formatting rules."
category: "documentation"
author_name: "Dr. Margaret Maloney"
specialty: "Pediatrics"
is_anonymous: false
is_featured: false
invocation_count: 5
clone_count: 5
published_at: "2026-04-20T14:58:21.331688Z"
gcs_url: null
output_schemas: {}
curated: false
---

Instructions for Writing a Short-Form Prescription Sig (≤140 Characters)

Purpose

Generate a concise, pharmacy-ready sig suitable for EHR fields with character limits.

Formatting Rules

- Maximum 140 characters
- Abbreviations allowed: PO, BID, TID, QD, QHS, PRN, q4h, q6h, etc.
- Must include dose, form (if needed), route, frequency
- Include indication for PRN meds
- Include max daily dose when safety-relevant
- No trailing zeros (5 mg, not 5.0 mg)
- Use leading zero (0.5 mg)
- No extra commentary

Standard Structure

Take [dose] [form] [route] [frequency] [PRN + indication if applicable].

Max [dose] per 24 hrs. (if needed)

Examples

Daily med:

Take 1 tab PO QD.

BID medication:

Take 1 cap PO BID.

PRN pain med:

Take 1 tab PO q6h PRN pain. Max 4 tabs/24 hrs.

Antibiotic:

Take 1 tab PO BID x10 days.

Inhaler:

Inhale 2 puffs q4h PRN SOB. Max 12 puffs/24 hrs.
