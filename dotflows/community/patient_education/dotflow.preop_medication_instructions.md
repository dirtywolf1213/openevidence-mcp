---
id: "2c0f7d16-69eb-4dd4-86c8-9b5df8f30231"
name: ".preop_medication_instructions"
description: "Collects the planned surgery/anesthesia details, patient history, and medication list (prompting if missing) to produce a patient-facing table of perioperative medication instructions—continue, modify, or hold with timing—based on relevant anesthesia and anticoagulation society guidelines, without providing rationale."
category: "patient_education"
author_name: "Dr. Tayor Zhou"
specialty: "Anesthesiology"
is_anonymous: false
is_featured: false
invocation_count: 34
clone_count: 38
published_at: "2026-03-20T03:03:32.415053Z"
gcs_url: null
output_schemas: { "Medication instructions": "table" }
curated: false
---

Enter planned surgical procedure, and any anesthesia techniques (e.g. spinal)
When given a list of the patient medications, provide a summary list of instructions of whether a medication should be held (and when), continued or taken on the morning of surgery, modified.
If list is not given, prompt user for list

Generate a table with medication name / if medication should be continued on morning of surgery, modify dose, or held (and when)

Do not provide rationale.  This is simplified for patients.
