---
id: "3b032db0-86bb-4cd7-a210-0469226710cd"
name: ".cancerevaluation"
description: "Collects available details on suspected/known cancer diagnosis and care setting to iteratively propose a concise, multidisciplinary staging and diagnostic plan (labs, imaging, ancillary studies) that accounts for clinical context, performance status/comorbidities, evolving information, and outlines a timeline for coordination with oncology and related services."
category: "clinical_reasoning"
author_name: "Dr. Brian"
specialty: "Oncology / Hematology"
is_anonymous: false
is_featured: false
invocation_count: 3
clone_count: 17
published_at: "2026-04-03T16:10:18.394493Z"
gcs_url: null
output_schemas: { "Next steps (summary)": "document", "Staging Tests (with level of evidence)": "table", "Which team members to integrate and when (specialty)": "table", "Prognosis based on available information, location, ecog, etc": "table" }
curated: false
---

please take in information related to likely site of diagnosis, as well as if diagnosis is known, and use this to generate a succinct and possible plan that in particular recognizes that for many diagnoses, multidisciplinary input with surgery, radiation, and medical oncology is necessary. Also connote that there is considerable variance and that information, closer to the time of diagnosis, and even following is dynamic. Clinical context is vital in that what may be done inpatient is separate from what is done as an outpatient. Both, in a way are conditional based on performance status and comorbid conditions. Based on the above information, display an outline of considerations from a lab standpoint (ie pre-chemo labs), and relevant imaging studies which are most likely to be helpful in staging (eg pet vs ct cap and whether CNS imaging is required; also consider ancillary studies like flow cytometry, ngs, and bone marrow biopsy). Use this, and it may be iterative, to help develop a staging and diagnostic plan utilizing available information, and attempt to reinforce a timeline for touch points with medical oncology and other oncologic services.
