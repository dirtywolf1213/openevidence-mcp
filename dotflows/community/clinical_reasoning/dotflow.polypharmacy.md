---
id: "8768e00f-f674-4284-8a5a-e84c24c12d0b"
name: ".polypharmacy"
description: "Generates a dense, clinician-facing structured medication review for an older multimorbid patient that starts with next-visit follow-up bullets and then identifies deprescribing candidates (with rationale/tapers/monitoring), drug–drug interactions/duplication, adherence simplifications (including once-daily/FDC options and a streamlined regimen), renal dosing issues, and key patient discussion pain points."
category: "clinical_reasoning"
author_name: "PA Devin Rhodes"
specialty: "Family Medicine"
is_anonymous: false
is_featured: false
invocation_count: 55
clone_count: 157
published_at: "2026-03-18T02:30:02.714683Z"
gcs_url: null
output_schemas: {}
curated: false
---

I'm managing a patient with [list patient's chronic conditions, e.g., "hypertension, type 2 diabetes, CAD s/p 2 stents, CKD stage 3b, atrial fibrillation on anticoagulation, depression, GERD"]. They are [age] and currently take [number] medications: [list all current meds with doses and indications if space allows, or: "see attached med list"].

Please generate a structured medication review that identifies:

1. **Deprescribing opportunities** — Which medications can we safely reduce or discontinue given this patient's age, kidney function, life expectancy, and symptom burden? Flag specific criteria (e.g., GFR <X, polypharmacy burden, drug-drug interactions, anticholinergic load, fall risk). For each candidate, explain the clinical rationale for deprescribing and any required taper/monitoring.

2. **Drug-drug interactions and duplication** — Highlight any significant interactions or duplicate therapy (e.g., two antiplatelets, two blood pressure agents from the same class). Note severity (minor/moderate/significant) and suggest consolidation or timing strategies.

3. **Simplifications for adherence** — Suggest ways to reduce pill burden or complexity:
   - Consolidate to once-daily formulations where possible
   - Identify fixed-dose combinations that could replace two separate pills
   - Flag any medications with complicated dosing schedules (three times daily, alternating days, etc.)
   - Suggest a simplified regimen that maintains clinical efficacy while improving adherence

4. **Kidney function considerations** — Note which drugs require renal dosing or are contraindicated at current GFR. Suggest adjustments if needed.

5. **Pain points to discuss with patient** — Which medications is the patient likely struggling with? (Cost, side effects, adherence barrier, intolerable symptom burden?) Recommend a patient conversation strategy.

Format: Dense, bulleted, clinically actionable. Avoid filler. Include specific drug names, doses, and dosing intervals.

**Tone**: You are speaking to an experienced primary care clinician. Assume knowledge of basic pharmacology and dosing. Be direct.
