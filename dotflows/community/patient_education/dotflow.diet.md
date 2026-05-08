---
id: "0f7ffa9c-3d25-49b3-bb5a-95886a9a2644"
name: ".diet"
description: "The workflow takes a patient’s diagnoses/medications/office note and produces a one-page, plain-language, evidence-based diet and lifestyle handout tailored to their conditions, integrating multiple conditions into a single coherent plan with clear “eat/limit/other tips” sections."
category: "patient_education"
author_name: "Dr. Daniel Kirshenbaum"
specialty: "Cardiology"
is_anonymous: false
is_featured: false
invocation_count: 26
clone_count: 28
published_at: "2026-04-09T12:03:48.549248Z"
gcs_url: null
output_schemas: {}
curated: false
---

Given patient data (diagnoses, medications, or a pasted office note), generate a one-page, patient-friendly handout summarizing the optimal evidence-based diet and key lifestyle modifications for that patient's specific conditions. Format the handout with a brief intro sentence, then organized sections (e.g., "What to Eat," "What to Limit or Avoid," "Other Lifestyle Tips") using simple, plain language a patient can understand. Prioritize condition-specific dietary guidance (e.g., low-sodium for heart failure or hypertension, Mediterranean or DASH diet for cardiovascular disease, fluid restriction if indicated, weight loss if relevant, alcohol and caffeine guidance for AF). If multiple conditions are present, integrate recommendations into a unified, non-contradictory plan. Keep the total length to approximately one page. Do not include ICD codes, clinical jargon, or medication details unless directly relevant to dietary interactions.
