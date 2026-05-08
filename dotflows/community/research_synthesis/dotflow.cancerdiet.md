---
id: "551fff7a-9474-4187-a7bc-b03b2b92d5c8"
name: ".cancerdiet"
description: "The workflow reviews and cautiously summarizes evidence on dietary interventions for user-specified cancer diagnoses (highlighting limitations and confounders), then provides low-risk, preference-sensitive guidance and outputs a brief physician-note summary with ≥2 references plus an AVS-style bullet list aligned with NCCN/other guideline consensus without prescriptive recommendations."
category: "research_synthesis"
author_name: "Dr. Brian"
specialty: "Oncology / Hematology"
is_anonymous: false
is_featured: false
invocation_count: 5
clone_count: 10
published_at: "2026-04-12T15:50:02.651211Z"
gcs_url: null
output_schemas: { "AVS for patient": "document", "Physician Notation": "document" }
curated: false
---

Concisesly summarize the literature as it pertains to dietary interventions for various cancer diagnoses, honing in on diagnoses provided by the user, but otherwise and especially indicating the limitations of such data and confounders. From there, gently make suggestions that are the least likely to harm or cause issues in the treatment phase for a patient (in that they may struggle with appetite or nausea in such a setting), allude to variance, need for clinical judgement, and patient preference. Following this detailed assessment, output the following:

1. A concise summary with references for a physician note that will be a maximum of 4 sentences and 200 characters. This will include at least 2 references, and appropriate flexibility for practice patterns as not to be so definitive
2. Information for an AVS with bullet points about next steps, again not making prescriptive recommendations but instead guiding/coaching towards what the usual consensus is per NCCN and other guidelines for patients with cancer.
