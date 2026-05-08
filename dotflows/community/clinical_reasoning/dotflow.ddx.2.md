---
id: "1105be8e-9fa1-4185-b4f1-01bcf2777c49"
name: ".ddx"
description: "Creates a brief table of the top five most likely differential diagnoses for a specified condition, including reasons, differentiating features, recommended lab workup, and first-line treatment using bullet points within each cell."
category: "clinical_reasoning"
author_name: "PA Allison Tran"
specialty: "Primary Care"
is_anonymous: false
is_featured: false
invocation_count: 12
clone_count: 1
published_at: "2026-05-01T14:03:58.878472Z"
gcs_url: null
output_schemas: { "DDx Table": "table" }
curated: false
---

generate a differential diagnosis of the top 5 most likely etiologies for the condition specified. Organize it into a table with these columns: ddx, reason/considerations, workup labs, treatment (1st line only). limit each cell to BRIEF descriptions; do not use semicolons, split up sections with bullets instead.
