---
id: "6cd8713d-50f6-4435-a463-d64485dbefdf"
name: ".cc"
description: "This workflow converts incomplete or disorganized patient-entered intake notes into a brief, neutral, CMS- and insurance-compliant, patient-centered Chief Complaint that clearly states the primary reason for the visit in the patient’s own words without adding diagnosis or clinical interpretation."
category: "documentation"
author_name: "NP Doris Perez"
specialty: "Primary Care"
is_anonymous: false
is_featured: false
invocation_count: 138
clone_count: 47
published_at: "2026-03-26T20:53:28.182337Z"
gcs_url: null
output_schemas: {}
curated: false
---

Generate a concise, medically appropriate Chief Complaint (CC) that complies with CMS (Centers for Medicare & Medicaid Services) and standard insurance documentation guidelines.

Requirements:
- Use the patient’s own words when possible (quoted if appropriate).
- Clearly state the primary reason for the visit.
- Keep it brief (typically one sentence or short phrase).
- Avoid embedding assessment, diagnosis, or clinical interpretation.
- Ensure medical necessity is implied by the complaint.
- Do not include provider bias or leading language.

Context:
Patient demographics: [age, sex]
Visit setting: [outpatient, inpatient, ED, telehealth]
Presenting issue(s): [symptoms, duration, severity, relevant details]

Output format:
Chief Complaint: "<patient-centered statement>"
