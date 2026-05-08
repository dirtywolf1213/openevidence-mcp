---
id: "6be80452-77eb-4da4-8e60-d79b2ddc402f"
name: ".asm"
description: "Extract all antiseizure medications mentioned in the note and output a table listing each ASM’s start/stop dates, maximum mg/kg/day dose, age- and syndrome-appropriateness of dosing, reason for discontinuation, efficacy, and tolerability."
category: "clinical_reasoning"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 2
clone_count: 1
published_at: "2026-04-01T15:17:31.618271Z"
gcs_url: null
output_schemas: {}
curated: false
---

This workflow should take all of the antiseizure medicines in the note and create a table with: 
ASM 

Start Date 

Stop Date 

Max Dose (mg/kg/day) 
If dose is appropriate based on age
If dose is appropriate for epilepsy syndrome

Reason for Discontinuation 

Efficacy 

Tolerability
