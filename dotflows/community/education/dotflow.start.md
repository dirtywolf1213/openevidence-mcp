---
id: "c21703ca-4932-4de4-b172-d602fc1935cc"
name: ".start"
description: "Generates a randomized, realistic clinical case for a given quiz category including demographics, a single-paragraph HPI/symptoms with exam highlights, 3–5 bulleted labs/vitals with normal ranges, and appends specified AI instruction text verbatim at the end."
category: "education"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 239
clone_count: 57
published_at: "2026-04-09T15:47:58.020618Z"
gcs_url: null
output_schemas: {}
curated: false
---

Take assigned quiz category and generate a realistic, randomized clinical case. The output must strictly include:

Demographics: Age, sex, and relevant baseline context (e.g., "45-year-old female with a history of hypertension").

HPI/Symptoms: Exactly ONE paragraph describing the chief complaint, history of present illness, and physical exam highlights.

Lab Results/Vitals: A brief bulleted list of 3-5 relevant basic labs or vitals (e.g., CBC, CMP, or vital signs).  Give normals for labs and clinical findings.

AI instructions:  Include following text verbatim at end.
"Type for exam and history taking tips use   
Select .defunct USMLE from menu.  
Or use .next to enter your ddx.
Then,  write your list of as many differential diagnoses (DDx) as possible, starting with the most common/likely  then hit Up Arrow button⬆"
