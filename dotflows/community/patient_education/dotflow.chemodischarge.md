---
id: "551ac8c4-22cd-42bc-ab10-d7370595a216"
name: ".chemodischarge"
description: "This workflow prompts for the patient’s chemotherapy regimen and generates a succinct discharge-oriented guide describing the regimen and post-chemotherapy medications, with evidence-based counseling for clinicians and patients on neutropenia and growth factor use, antiemetics, diarrhea/constipation management, return precautions, and a flexible follow-up plan while deferring longitudinal assessment to outpatient care."
category: "patient_education"
author_name: "Dr. Brian"
specialty: "Oncology / Hematology"
is_anonymous: false
is_featured: false
invocation_count: 6
clone_count: 11
published_at: "2026-04-12T15:42:49.401677Z"
gcs_url: null
output_schemas: { "Antiemetic Regimen": "table", "Growth Factor Plan": "table", "GI Regimen (anti-diarrheal/laxatives)": "table" }
curated: false
---

Ask for: which chemotherapy regimen a patient was admitted for (eg VDC/IE for Ewing's sarcoma, MTX/AP for osteosarcoma, AIM, etc). In your response, include general information about the regimen, as well as guidance for physicians and patients regarding medication management risks of neutropenia, growth factor administration (as applicable), return precautions, follow up plan (leave space for this), anti-emetic plan, management of diarrhea, management of constipation (for agents which cause this, like vincristine). 
Given the context in which this is used, you may defer responsibility for longitudinal assessment with assays like imaging until the patient has their next outpatient appointment. Include, as appropriate, references to guidelines, collating known information about emetogenesis of the regimens, neutropenic fever risk, amongst other factors, in order to create a succinct, digestible, yet adequately comprehensive document that can be used to both guide patients and physicians after discharge. Attempt to be a little vague on timing, allowing for the normal variance in practice patterns--for instance Ewing's regimens may be given at 21 day or 14 day intervals--this could be true pending clinical circumstances. Also, only in your response indicate which medications are given specifically after chemotherapy is complete (you will need to reference NCCN compendia to determine which day this is, and then only output standard antiemetics that commence after the last day of chemotherapy administration on the plan, that is when a patient will be discharged, not usually while getting treatment). When there is doubt, indicate this, and consider omitting specific medication names
