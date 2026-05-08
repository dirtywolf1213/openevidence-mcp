---
id: "a96980da-fec7-482d-87cc-b5bab44a9144"
name: ".mi_opioidpsych"
description: "This workflow generates a guideline-based psychiatric and opioid-safety plan tailored to the patient’s diagnosis, opioid regimen, and risk/PDMP data, including DSM-5-TR rationale, evidence-based treatment options, risk stratification, co-prescribing concerns, monitoring cadence, alternatives, and defensible documentation."
category: "clinical_reasoning"
author_name: "NP Helen Cruz"
specialty: "Psychiatry"
is_anonymous: false
is_featured: false
invocation_count: 2
clone_count: 8
published_at: "2026-04-10T19:40:44.742781Z"
gcs_url: null
output_schemas: {}
curated: false
---

“Respond using current psychiatric treatment guidelines. Include DSM-5-TR reasoning, evidence-based medication dosing ranges, psychotherapy recommendations, monitoring parameters, and defensible documentation language.”

Psychiatric Dx: [Dx]
Opioid medication: [Name + dose]
Risk factors present: [List]
PDMP findings: [Summary]

Provide:
Risk stratification
Co-prescribing concerns
Monitoring frequency
Alternative treatments
