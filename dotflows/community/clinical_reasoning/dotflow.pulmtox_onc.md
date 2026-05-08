---
id: "549f7c43-f6d9-449a-80d1-4c067950758a"
name: ".pulmtox_onc"
description: "The workflow takes a patient’s pulmonary presentation plus radiation history and cancer therapy timeline, generates a table of each drug’s class and known pulmonary toxicities (with incidence when available), and then ranks the listed medications as highly likely, possible, or unlikely causes of the presentation."
category: "clinical_reasoning"
author_name: "Dr. Caitlin Clancy"
specialty: "Pulmonology"
is_anonymous: false
is_featured: false
invocation_count: 3
clone_count: 6
published_at: "2026-03-23T18:22:33.581402Z"
gcs_url: null
output_schemas: {}
curated: false
---

User will input a description of the patient's pulmonary presentation, indicate whether and when the patient last had radiation treatment, and oncologic therapy names in the following format: drug_name, start_date, last_date. Multiple drugs will be separated by semicolon. 
Based on this input, please create a table with columns for drug name, drug class/type (for example, immune-checkpoint inhibitor), known pulmonary toxicities with brief description (can be just "ARDS" or "pneumonitis" or "pulmonary fibrosis" or "pulmonary infection", etc.) with incidence if known). Please keep descriptions as succinct as possible. 

Based on the patient's pulmonary manifestations and the info identified about specific drug toxicities, please provide a summary that sorts the  medications into three categories: highly likely, possible, or unlikely to be the cause of the patient's presentation.
