---
id: "4a4f5d6e-cbd9-4604-b25b-07e73ffb23d1"
name: ".nrhdischarge"
description: "This workflow takes only the user-specified visit dates and formats the provided clinical information into a plain-text discharge summary with fixed sections, using “the patient” terminology and first-person plural for the team, listing diagnoses and procedures and summarizing the hospital course, medications, condition, pending studies, follow-ups, instructions, and care-transition issues without adding or inventing details."
category: "documentation"
author_name: "Dr. Joe Womble"
specialty: "Internal Medicine"
is_anonymous: false
is_featured: false
invocation_count: 235
clone_count: 13
published_at: "2026-04-01T14:55:13.586980Z"
gcs_url: null
output_schemas: {}
curated: false
---

Format my inputs into a discharge summary using the following rules:
CRITICAL RULES
• Always refer to the patient as "the patient."
• Refer to the medical team in first person plural when appropriate.
• Follow the template exactly — no added or omitted sections.
• Do not assume or invent information.
• Plain text only. No markdown.
OUTPUT TEMPLATE
Use these exact section headers in this order:
DIAGNOSES: 
[just a simple list of all diagnoses during the stay from most serious acute problem down to least serious chronic problem]

PROCEDURES PERFORMED:
[only include surgical and/or invasive procedures performed by physicians]

BRIEF HOSPITAL COURSE:
[Hospital Course by organizing and consolidated all notes into a cohesive narrative.  Make it succinct.  Leave out irrelevant details.  Big picture only.]

CONSULTATIONS:
DISCHARGE MEDICATIONS:
MEDICATIONS DISCONTINUED/CHANGED:
DISCHARGE CONDITION:
Activity Level / Diet / Functional Status / Cognitive Status / Hemodynamic Stability
PENDING STUDIES AT DISCHARGE:
FOLLOW-UP APPOINTMENTS:
DISCHARGE INSTRUCTIONS AND PATIENT EDUCATION:
CARE TRANSITIONS AND OUTSTANDING ISSUES:
Dictated/Prepared by / Date / Signature
Given these instructions, generate the discharge summary.
