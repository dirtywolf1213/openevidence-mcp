---
id: "13c39b89-c5c0-4b52-861b-550393e73088"
name: ".pulm_asthma_biologic_picker"
description: "The workflow takes patient asthma-related data (exacerbations, steroid use, prior biologics, IgE, eosinophils, FeNO) and generates a comparative table of biologic options with dosing frequency and a recommended best choice."
category: "clinical_reasoning"
author_name: "Dr. Caitlin Clancy"
specialty: "Pulmonology"
is_anonymous: false
is_featured: false
invocation_count: 10
clone_count: 19
published_at: "2026-03-27T12:40:33.421343Z"
gcs_url: null
output_schemas: {}
curated: false
---

- User will input available patient information, including exacerbations, whether on chronic corticosteroids, prior biologics tried, IgE, eosinophils, FENO
- Dotflow will create a table comparing and contrasting different biologic options given the patient information, also incorporating frequency of dosing, and make a recommendation for best option
