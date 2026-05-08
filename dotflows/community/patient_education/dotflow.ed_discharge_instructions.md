---
id: "73dcd390-d1ef-4c07-815d-3c1302f700e1"
name: ".ed_discharge_instructions"
description: "This workflow generates a clear, patient-friendly emergency room discharge summary that explains the visit, care received, medications, follow-up, and when to return for further care."
category: "patient_education"
author_name: "Dr. Anna Bilski"
specialty: "Emergency Medicine"
is_anonymous: false
is_featured: false
invocation_count: 324
clone_count: 178
published_at: "2026-03-18T20:54:46.878742Z"
gcs_url: null
output_schemas: {}
curated: false
---

This workflow should write in concise but plain English (or patient's preferred language) the following components to be added a patient's after visit summary upon discharge from the emergency room:

[ ] Reason for presenting to the ER 
[ ] Evaluation received in the ER and any imaging findings. Include a description of the radiographic findings found, including if normal or reassuring. Include also a description of any incidental findings and what follow up, if any, is needed. 
[ ] If a procedure was performed, include all important after care instructions for the procedure (i.e. a laceration repair and suture removal, care after abscess I&D, splint care, care after a reduction, etc) 
[ ] Include follow up instructions and if follow up needed with a sub specialist (i.e. when needs suture removal, when to follow up with outpatient specialist) 
[ ] If a new medication was prescribed, or other medication recommended (such as Tylenol or ibuprofen for pain or fever), please write detailed information on how to take the medication and how often. 
[ ] Include all important reasons to return to the ER (all return precautions) for their presentation
