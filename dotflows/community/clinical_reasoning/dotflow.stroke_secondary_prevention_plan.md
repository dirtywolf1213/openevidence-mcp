---
id: "adfefdd8-2557-4d86-9860-8af750f69aae"
name: ".stroke_secondary_prevention_plan"
description: "This workflow takes a stroke/TIA case, determines the likely stroke mechanism and modifiable risk factors, then generates a structured secondary prevention plan across medications, risk-factor control, monitoring/imaging, and lifestyle changes in both clinician- and patient-facing formats, including return precautions and follow-up/testing plans."
category: "clinical_reasoning"
author_name: "Dr. Rizwan Kalani"
specialty: "Neurology"
is_anonymous: false
is_featured: false
invocation_count: 125
clone_count: 38
published_at: "2026-03-18T23:52:22.493201Z"
gcs_url: null
output_schemas: {}
curated: false
---

You are creating a comprehensive stroke/TIA secondary prevention plan for a vascular neurologist.

1. From the case provided, identify the stroke mechanism and major modifiable risk factors:
- Stroke subtype: large artery atherosclerosis, cardioembolism (AF, PFO, valvular, other), small vessel/lacunar, other determined, cryptogenic/ESUS.
- Risk factors: hypertension, diabetes, dyslipidemia, AF, smoking, obesity, sleep apnea, physical inactivity, alcohol use, illicit drug use.

2. Provide structured recommendations organized by domain:

"Antithrombotic therapy":
- Antiplatelet vs anticoagulation based on mechanism.
- Specific agent, dose, duration.
- Dual antiplatelet therapy indications and duration (minor stroke/TIA within 24h).
- Special considerations (e.g., aspirin + anticoagulation, cancer-related stroke).

"Blood pressure management":
- Target range based on stroke subtype and timing.
- Preferred agents and rationale.
- When to initiate or adjust (acute vs subacute vs chronic phase).

"Lipid management":
- LDL target based on stroke mechanism.
- Statin intensity and specific agent.
- When to add ezetimibe or PCSK9 inhibitor.

"Diabetes management":
- HbA1c target.
- Note cardiovascular benefit of GLP-1 RA and SGLT2 inhibitors.

"AF detection and management":
- Cardiac monitoring plan (telemetry, Holter, extended loop recorder).
- Anticoagulation choice if AF detected.
- LAA closure consideration if anticoagulation contraindicated.

"Vascular imaging follow-up":
- Carotid and intracranial vessel imaging schedule.
- CEA/CAS evaluation criteria if symptomatic stenosis.

"Lifestyle counseling":
- Smoking cessation resources.
- Exercise prescription.
- Diet recommendations (Mediterranean, DASH).
- Alcohol moderation.
- Weight management.
- Sleep apnea screening and treatment.

3. Produce two versions:
- Clinician-facing plan: concise, suitable for the discharge summary or clinic note.
- Patient-facing plan: written in plain language, suitable as a handout or patient portal message, explaining why each medication and lifestyle change matters for preventing another stroke.

4. Include return precautions: when to call 911 (BE-FAST or similar), follow-up appointment timing, and what tests are pending at discharge.
