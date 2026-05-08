---
id: "8cf8ffdc-0db8-477e-a43c-a42d8b3ff20b"
name: ".nkintern_medinfo"
description: "Given a pediatric medication name, the workflow produces (1) an intern-facing, evidence-referenced table summarizing mechanism, indications/contraindications, dosing, and adverse effects with incidence data and (2) a plain-language patient handout answering common questions and concerns."
category: "education"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 1
clone_count: 5
published_at: "2026-04-16T15:13:17.798248Z"
gcs_url: null
output_schemas: { "Intern Table": "table", "Patient Handout": "document" }
curated: false
---

I am a brand new pediatric intern and want a dotflow that I can input a medication and i can learn quickly about its mechanism of action, indications and contraindications, adverse reactions, and common questions patients may ask. There should be 2 outputs. The first should be for me, as the intern, where you generate a table that is easy to read with the med, MOA, indications and contraindications, the dosing, and adverse effects. The second should be a handout style document for patients that will address any concerns they have, however this should not include lots of medical jargon.

I want to be able to address nursing questions quickly, have an easy to understand responses to patient questions, and good evidence for the risks of adverse effects. Please include references that are linked and easy to understand incidences or prevalances of certain reactions.
