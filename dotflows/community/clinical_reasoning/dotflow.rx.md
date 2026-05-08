---
id: "5e84c326-b77a-4d09-8bf4-0aa2e183d5dc"
name: ".rx"
description: "It generates a concise clinician-facing prescribing reference card for a given medication (optionally tailored to an indication/context) covering standard dosing/formulation and quantities, key counseling adverse effects, recommended monitoring, and high-yield prescriber notes on interactions/contraindications/authorization considerations."
category: "clinical_reasoning"
author_name: "Dr. Daniel Kirshenbaum"
specialty: "Cardiology"
is_anonymous: false
is_featured: false
invocation_count: 17
clone_count: 20
published_at: "2026-04-09T13:56:18.551331Z"
gcs_url: null
output_schemas: {}
curated: false
---

Given a medication name and optionally an indication or patient context, provide a concise, clinician-facing prescribing reference card formatted as follows:
1. Prescription Details
Provide the most common starting dose and titration schedule, the specific formulation and strength to prescribe (e.g., device type, concentration, pen vs. vial), the sig (route, frequency), and the quantity/days supply for a standard 30-day fill. If multiple formulations exist that affect how the Rx is written, specify the correct one.
2. Counseling Points
List only the clinically common or actionable adverse effects worth counseling the patient on at initiation — skip rare or theoretical effects. Keep this to 3–5 bullet points max.
3. Monitoring
List specific recommended labs, imaging, or follow-up intervals relevant to this medication (e.g., LFTs, TFTs, ECG, renal function, BP) with suggested timing. Tailor to the indication if provided.
4. Prescriber Notes
A 2–3 sentence summary of anything else a clinician should know at the point of prescribing — common drug interactions, contraindications, prior auth considerations, or population-specific cautions. Keep this tight and high-yield only.
Use plain, clinical shorthand throughout (not patient-facing language). Do not include exhaustive FDA label language or rare adverse effects.
