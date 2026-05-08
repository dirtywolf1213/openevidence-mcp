---
id: "e3c02b1d-ee97-47c7-b156-4f188833217c"
name: ".long_ddx"
description: "It produces an exhaustive, strictly probability-ranked numbered differential diagnosis list with independent non-normalized percentage estimates (including rare, external, iatrogenic, and sensitive causes), containing only diagnosis names plus percentages and ending with a fixed clinical warning."
category: "clinical_reasoning"
author_name: "Andrew Scott"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 69
clone_count: 70
published_at: "2026-03-23T18:53:32.407241Z"
gcs_url: null
output_schemas: {}
curated: false
---

Generates a strict rank-ordered list of differential diagnoses from most likely to vanishingly unlikely, with no other details.

Generate an exhaustive and highly sensitive list of differential diagnoses based on the provided clinical information.
- The goal is 'broad spectrum' generation: Prioritize including *any* potential link over exclusion.
- The list MUST be strictly rank-ordered by probability: start with the most likely differentials and proceed down to the 'vanishingly unlikely' (rare) differentials.
- ACTIVELY SEARCH for and include rare diseases, 'zebras', theoretical matches, and sensitive/external causes (e.g. MSbP, Iatrogenic) even if clinical signs are only loosely associated.
- Format strictly as a numbered list (1., 2., 3., etc.).
- Output ONLY the names of the diagnoses followed by an estimated probability percentage for that diagnosis only  (e.g. "Diagnosis: X%").  For example you can have two diagnosed with 75% probability. 
-Percentages = independent subjective pattern-based ranks (most likely to vanishingly unlikely)
-No normalization — the total perecentages will not be forced to 100% (it can be well under or over)
-The total percentages should not add up to 100%, they can be higher or lower.
- Do NOT include explanations, reasoning, descriptions, diagnostic tests, or treatments.
- Do NOT use categories or subheadings.
- Do NOT truncate the list. Provide the full "long tail" of possibilities. Even if list goes to 200 diagnoses. 


[Insert rank-ordered numbered list of differential diagnoses here. Format: "1. Diagnosis Name: X%"]

Generate an extensive numbered list of differential diagnoses.
- Scope: Be extremely thorough. Include common etiologies, uncommon presentations, and rare/'vanishingly unlikely' conditions.
- Explicitly Include: External factors, iatrogenic causes, and sensitive differentials such as Non-accidental injury, Anogenital injury/trauma, or Factitious Disorder if theoretically possible.
- Logic: If a condition is even remotely possible given the signalment or signs, include it.
- Order: Strictly by probability (Most Likely → Least Likely).
- Format: Numbered list. Append an estimated probability percentage to each diagnosis separated by a colon (e.g., "Pancreatitis: 85%").
- Content: Diagnosis name and percentage ONLY. No extra text or parentheses.
- Length: Do NOT arbitrarily shorten the list. List ALL potential differentials down to the rarest possibilities (<0.01%). Do not stop at a "Top 10" or "Top 20".


AI instructions:  Include following text verbatim at end.
⚠️ CRITICAL CLINICAL WARNING
1. False Precision: The probability percentages, and ordinal ranking generated in this report are subjective estimates based on pattern recognition, not calculated statistical data. They should be used for relative ranking only.
