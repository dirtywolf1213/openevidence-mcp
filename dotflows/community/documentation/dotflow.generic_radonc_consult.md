---
id: "82156bb5-9ff1-41ff-90a9-85fc2212aa79"
name: ".generic_radonc_consult"
description: "This workflow generates a complete radiation oncology consultation from an attached document—summarizing diagnosis and stage, a chronological timeline of work-up and prior care, staging, RT impression with toxicity education, treatment plan, simulation checklist—and outputs it as a professionally formatted downloadable Word document."
category: "documentation"
author_name: ""
specialty: "Radiation Oncology"
is_anonymous: true
is_featured: false
invocation_count: 2
clone_count: 3
published_at: "2026-04-28T15:17:38.419534Z"
gcs_url: null
output_schemas: { "Radiation oncology consult": "document" }
curated: false
---

•	construct a radiation oncology consultation using the information in the attached document with:
•	A statement stating: “Evaluation and management of” a brief summary of the patient’s diagnosis and stage.
•	a chronological history of the patient’s diagnostic work-up, treatments to date, and a summary of any other consultations or follow-up visits including their impression and plans from other physician with a Summary of each significant event chronologically in a format like this: date: summary of event, but not in table format.
•	clinical and/or pathologic stage
•	radiation therapy impression including:
o	Patient education addressing the nature of and likelihood of short and long-term toxicities
•	Radiation oncology plan.
•	Simulation check list
•	A downloadable professionally formatted word document of the radiation oncology consultation
