---
id: "b50ea389-98a5-41a5-a74d-f7b42eec9571"
name: ".generate_ctcae_v6_grading_from_medical_note"
description: "Extract all positively asserted adverse events from medical notes, map them to the most specific CTCAE v6.0 terms, assign the highest evidence-supported grades (using vitals/labs and interventions as grading evidence), deduplicate events, and provide exact supporting text/values while excluding negatives, normals, ruled-out/hypothetical/history-only items, and stable baseline conditions unless active or worsened."
category: "documentation"
author_name: "Dr. Marc Saintjour"
specialty: "Hospital-Based Medicine"
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 0
published_at: "2026-05-02T21:51:01.003884Z"
gcs_url: null
output_schemas: {}
curated: false
---

Review the provided medical note(s) and extract all positively asserted adverse events using CTCAE v6.0 terminology and grading. Capture every clinically unfavorable sign, symptom, diagnosis, toxicity, infusion reaction, procedure-related complication, abnormal vital sign, and abnormal laboratory abnormality that is present, ongoing, worsened, or newly developed in the note. Include asymptomatic but clinically meaningful abnormalities when they meet CTCAE reporting criteria.

Include:
- patient-reported symptoms and toxicities
- clinician-observed signs and physical exam abnormalities
- abnormal vitals such as fever, hypoxia, tachycardia, bradycardia, hypertension, hypotension, weight loss, or weight gain
- abnormal labs such as neutropenia, anemia, thrombocytopenia, creatinine elevation, transaminitis, bilirubin elevation, electrolyte abnormalities, hyperglycemia, or hypoglycemia
- severity signals such as hospitalization, ED visit, dose hold, dose reduction, transfusion, oxygen requirement, IV fluids, IV electrolytes, antibiotics, steroids, feeding support, or other interventions that help determine grade

Do not require explicit attribution to treatment to capture an adverse event. However, exclude:
- negated or absent findings such as “denies nausea,” “no diarrhea,” “afebrile,” “no rash,” or “no evidence of infection”
- normal findings and labs within normal range
- ruled-out diagnoses, hypothetical risks, anticipatory counseling, and education-only statements
- family history
- historical or resolved events that are not active in the current note
- stable chronic baseline conditions unless the note clearly states they are active, worsened, exacerbated, or clinically relevant in the current encounter

For each extracted event:
1. Map the note language to the most specific CTCAE v6.0 term.
2. Assign the highest supported CTCAE grade using only the evidence in the note.
3. For labs and vitals, use exact numeric values, units, reference ranges, and baseline values when available.
4. When baseline is abnormal, apply CTCAE v6.0 guidance and grade change from baseline when appropriate.
5. When an event is clearly present but the available information is not sufficient for reliable CTCAE grading, mark it as “Ungradable” or “Insufficient data to grade” rather than guessing.
6. Deduplicate repeated mentions of the same adverse event within the same note or encounter and keep the highest clearly supported grade.
7. Preserve the exact supporting text, numeric value, or clinical evidence used for each extraction and grade.

Prioritize exhaustive capture of positive adverse events while strictly excluding negatives and non-events.
