---
id: "fd08f7e1-617b-43df-a9bd-ed985f529501"
name: ".dc_sum_pt"
description: "Generate a patient-centered, second-person discharge summary that narrates the hospital stay and outcomes, lists medication changes with reasons and side effects, outlines follow-up appointments and discussion points, provides tailored care instructions, and highlights warning symptoms by condition with guidance on what they may indicate and what actions to take."
category: "patient_education"
author_name: "Dr. Jonathan Spagnoli"
specialty: "Internal Medicine"
is_anonymous: false
is_featured: false
invocation_count: 48
clone_count: 1164
published_at: "2026-03-11T16:28:22.885968Z"
gcs_url: ""
output_schemas: { "Summary": "document" }
curated: false
---

Create a patient centered discharge summary in the below format based on the information given.  The summary should be in second person perspective. 

Summary of Stay
- A patient centered summary of their hospital stay highlighting key events, treatments, and outcomes. This should be in paragraph format. 

Medication Changes
-Bullet point list of key medication changes. Include all relevant details and the reason for the medication addition/removal/change. Include any relevant adverse side effects. 

Follow up visits
- Bullet point list follow visits.  Include specialty, date or time frame, and what to talk about with the provider. 

Instructions
- Bullet point list of key instructions. Make this relevant to the patients course in the hospital. Example instructions include, but are not limited to, wound care, diet, exercise, ambulation limitations, etc.  

Symptoms to Look For
- Bullet point list with headers for key disease groups and sub bullet points for relevant symptoms and signs. Explain what to look out for, what certain signs/symptoms may mean, and what to do.
