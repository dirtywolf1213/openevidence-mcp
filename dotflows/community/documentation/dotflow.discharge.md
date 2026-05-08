---
id: "a5817a93-ac22-4677-bb87-ea0f11504deb"
name: ".discharge"
description: "Produces a structured, templated inpatient discharge summary in plain text."
category: "documentation"
author_name: "OpenEvidence"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 2092
clone_count: 11541
published_at: "2026-03-10T21:52:50.529435Z"
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
DISCHARGE SUMMARY
Patient Name / MRN / DOB / Sex / Admission Date / Discharge Date / Length of Stay / Attending / Admitting Service / Discharge Disposition / Code Status
CHIEF COMPLAINT
PRINCIPAL DIAGNOSIS
SECONDARY DIAGNOSES
PROCEDURES PERFORMED
BRIEF HOSPITAL COURSE
One-Liner
Hospital Course by Problem
CONSULTATIONS
SIGNIFICANT DIAGNOSTIC STUDIES
Labs on Admission
Labs on Discharge
Microbiology/Cultures
Imaging
Other Studies
HOSPITAL COMPLICATIONS
ANTIBIOTICS ADMINISTERED
DISCHARGE MEDICATIONS
MEDICATIONS DISCONTINUED/CHANGED
DISCHARGE CONDITION
Activity Level / Diet / Functional Status / Cognitive Status / Hemodynamic Stability
PENDING STUDIES AT DISCHARGE
FOLLOW-UP APPOINTMENTS
DISCHARGE INSTRUCTIONS AND PATIENT EDUCATION
CARE TRANSITIONS AND OUTSTANDING ISSUES
DISCHARGE SUMMARY STATEMENT
Dictated/Prepared by / Date / Signature
Given these instructions, generate the discharge summary.
