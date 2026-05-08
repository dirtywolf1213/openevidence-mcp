---
id: "b2a7b719-a01d-42e8-a0d7-7f690bd012be"
name: ".ebm_case_analysis"
description: "Transforms a clinician’s question into a patient-tailored EBM PICO with concise, tiered recommendations grounded in key guidelines/trials, explicitly balancing net benefit and feasibility against the patient’s life expectancy, frailty, follow-up capacity, and social context, and ending with actionable next steps plus a safety-check checklist and patient-specific risk note."
category: "research_synthesis"
author_name: "Dr. Fernando Avila"
specialty: "Anesthesiology"
is_anonymous: false
is_featured: false
invocation_count: 1
clone_count: 4
published_at: "2026-04-15T18:27:39.357854Z"
gcs_url: null
output_schemas: { "BEST CURRENT ANSWER": "table", "UNCERTAINTIES AND CAVEATS": "table", "SAFETY CHECKS BEFORE ACTING": "table" }
curated: false
---

Converts your clinical question into a patient-specific Evidence-Based Medicine query, returning a structured PICO analysis with tiered recommendations, landmark-trial effect sizes, and a safety gate that weighs guideline-based care against the patient’s life expectancy, frailty, follow-up capacity, and social context.

WHAT THIS DOTFLOW DOES:
Frame the user’s clinical question as an EBM PICO query, identify the most decision-relevant evidence (guidelines, systematic reviews, pivotal trials), and provide a brief actionable answer tailored to the specific patient and setting.

[INDIVIDUALIZATION RULE]
When guideline-recommended interventions carry meaningful risk, burden, or low expected yield relative to the patient’s life expectancy, frailty, or follow-up capacity, prioritize PATIENT-LEVEL NET BENEFIT and safety over population-level indications when formulating the top-line recommendation.

[KEEP THE RESPONSE CLINICAL]
Assume clinician-level knowledge. Eliminate background didactics. Stay strictly within the clinical question presented.

OUTPUT STRUCTURE — FOLLOW EXACTLY, IN THIS ORDER:

PICO QUESTION
- 1 bullet stating P, I, C, O with key patient modifiers inline.
- Use the least invasive realistic alternative as the default comparator (C) unless the user specifies otherwise.

BEST CURRENT ANSWER
- Format as a table with ≤5 rows.
- Columns: Recommendation | Evidence strength | Key source(s)
- Use evidence strength as:
  - ⭐ limited
  - ⭐⭐ moderate
  - ⭐⭐⭐ strong
- Order recommendations from SAFEST / LEAST INVASIVE to MOST INVASIVE.

KEY EVIDENCE
- 3–6 bullets.
- Format: [Source + year]: one-sentence clinical takeaway.
- Prefer absolute outcomes when available (ARR, NNT, event rates, absolute harms).

UNCERTAINTIES AND CAVEATS
- 2–5 bullets.
- Flag indirect populations, conflicting data, extrapolated recommendations, or missing safety data.
- [If the patient has frailty, housing instability, mental health burden, poor support, or limited follow-up capacity, explicitly state how these factors affect feasibility, risk, or adherence.]

SUGGESTED NEXT STEPS
- ≤6 bullets total.
- Split into:
  - IF PROCEEDING
  - IF DEFERRING / ALTERNATIVE
- [If the question involves a high-risk procedure or treatment in a frail, elderly, or high-comorbidity patient, OPEN with risk-benefit framing and goals-of-care before listing procedural steps.]

SAFETY CHECKS BEFORE ACTING
- End with a table containing 3–8 rows.
- Columns: ☐ Check | Rationale | Must / Nice-to-have
- “Must” = skipping this creates meaningful patient safety risk or would materially change the decision.

CLOSING
- End with a 1-sentence PATIENT-SPECIFIC safety note naming the exact risk and the patient features driving that risk.

---

[EXAMPLE BELOW — FOLLOW THE STRUCTURE, TONE, AND BREVITY. DO NOT COPY THE CLINICAL CONTENT UNLESS IT FITS THE USER’S CASE.]

Example user input:
“79-year-old woman with CKD3 and AF, hospitalized for melena, Hgb 8.2, hemodynamically stable. Should we resume anticoagulation before discharge?”

Example output:

PICO QUESTION
- P = 79yo woman with CKD3, AF, recent upper GI bleed, hospitalized and now hemodynamically stable | I = resume anticoagulation before discharge | C = delayed resumption after discharge | O = stroke/systemic embolism, recurrent bleeding, mortality

BEST CURRENT ANSWER
| Recommendation | Evidence strength | Key source(s) |
| --- | --- | --- |
| Confirm hemostasis before resuming anticoagulation. | ⭐⭐⭐ | Guideline/review |
| If thromboembolic risk is high and hemostasis is secure, favor early resumption over prolonged interruption. | ⭐⭐⭐ | Guideline/review |
| If rebleeding risk remains high, defer briefly and reassess with GI/cardiology input. | ⭐⭐ | Guideline/review |

KEY EVIDENCE
- [Guideline 2024]: Early resumption after hemostasis lowers thromboembolic risk, though bleeding risk remains patient-dependent.
- [Review 2023]: Net benefit generally favors restarting anticoagulation once bleeding control is established in high-risk AF.

UNCERTAINTIES AND CAVEATS
- CKD may alter drug choice and bleeding risk.
- Exact timing depends on endoscopic findings and source control.

SUGGESTED NEXT STEPS
IF PROCEEDING
- Confirm hemostasis, renal function, and anticoagulant choice/dose.
IF DEFERRING / ALTERNATIVE
- Use short-interval reassessment and document stroke-vs-bleed tradeoff.

SAFETY CHECKS BEFORE ACTING
| ☐ Check | Rationale | Must / Nice-to-have |
| --- | --- | --- |
| Hemostasis confirmed | Ongoing bleeding changes net benefit | Must |
| Renal function reviewed | Affects agent selection/dose | Must |
| Shared decision-making documented | High-stakes tradeoff | Must |

Patient-specific safety note: In this patient, the decision should hinge on confirmed hemostasis, renal function, and near-term rebleeding risk versus stroke prevention benefit.
