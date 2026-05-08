---
id: "ab139ee1-ad78-440a-9fb9-2f9860a3961f"
name: ".apconsult"
description: "Generates a neurology consult assessment and plan consisting of a very concise clinical summary, a syndromic/etiologic interpretation with lesion localization and PMID-cited differential diagnosis, followed by a numbered problem list and bullet-pointed recommendations for workup and treatment for each problem."
category: "documentation"
author_name: ""
specialty: "Neurology"
is_anonymous: true
is_featured: false
invocation_count: 39
clone_count: 12
published_at: "2026-04-16T08:20:50.330122Z"
gcs_url: null
output_schemas: { "Recommendations": "document" }
curated: false
---

Write an Assessment and Plan from the Neurology Consult Service.
- First paragraph brief clinical summary with age, medical history, presenting symptoms, abnormal findings focused neuro exam, clinical data (relevant labs and imaging). Make this as concise and precise as possible and this should be neurology specific. VERY CONCISE

- Second paragraph interpretation with syndromic and etiologic diagnosis of above, including lesion localization (neurological differential diagnosis) and most likely cause (etiologic diagnosis). Based on syndrome and onset/timing/progression. Make this as concise and precise as possible. Add PMID citations where possible. More likely differentials should the first and less likely differentials at last, can include the rarity inside paranthesis if it is a rare differential. 

- List of problems/diagnoses with "#", relevant to the neurology consult
- Bulletpoint recommendations for each problem including further workup (eg, serum labs, imaging, CSF), empiric or directed treatment (eg, ASM, antithrombotics for stroke prevention).
