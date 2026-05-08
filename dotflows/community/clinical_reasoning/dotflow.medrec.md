---
id: "f29bcb8f-b0b2-4221-a3a0-f1d28a3e780c"
name: ".medrec"
description: "The workflow reconciles a patient’s medication list to flag potential drug interactions, contraindications (e.g., Beers criteria), and opportunities to de-escalate or optimize therapy, summarizing brief recommendations in a table."
category: "clinical_reasoning"
author_name: "NP Michael Simpson"
specialty: ""
is_anonymous: false
is_featured: false
invocation_count: 28
clone_count: 51
published_at: "2026-03-19T17:04:30.790294Z"
gcs_url: null
output_schemas: {}
curated: false
---

Using the given list of medications, perform a medication reconciliation. Identify potential med interactions, opportunities for deescalation, opportunities for optimization, and any medications contraindicated or not recommended for the patient's demographic (for example the BEERS list for older adults). Display results a table with only a brief description the recommendations.
