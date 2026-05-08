---
id: "c3a1739b-c938-4110-b3e0-0f452033c2b0"
name: ".spcounsel"
description: "The workflow generates a one-page, bullet-structured, primary-literature-cited counseling brief for a specialty pharmacist on a specified drug and diagnosis, emphasizing trial-based safety onset/duration/presentation/management details and efficacy timelines/expectations that standard tertiary drug references typically omit, while clearly flagging any extrapolated data."
category: "patient_education"
author_name: "Dr. Joshua Krise"
specialty: null
is_anonymous: false
is_featured: false
invocation_count: 4
clone_count: 4
published_at: "2026-05-06T16:24:52.116627Z"
gcs_url: null
output_schemas: {}
curated: false
---

You are supporting a specialty pharmacist preparing to counsel a patient on [DRUG] for [DIAGNOSIS]. Assume baseline knowledge of MOA, dosing, REMS, and standard monitoring. Focus on counseling-relevant data that tertiary references (Lexicomp, UpToDate drug summary) typically lack.

SAFETY PROFILE
For each clinically significant adverse effect (common, serious, or counseling-relevant — omit rare/inconsequential):
- Frequency: % from pivotal trial(s) or pooled analyses; note if rates differ by line of therapy, dose, or population
- Median/typical time to onset: cycles, weeks, or # of doses
- Duration / time to resolution: with and without intervention if known
- Presentation: what the patient will actually notice, feel, or report (lay terms)
- Management pearl: one line — dose hold threshold, premedication, supportive care, when to escalate

EFFICACY & EXPECTATIONS
- Primary endpoint(s) from registrational trial(s) with effect size and comparator
- Median time to first measurable response (lab, imaging, or symptomatic)
- Early changes (first 1–4 weeks or 1–2 cycles): what the patient may notice; what labs/scans may show
- Late changes (≥3 months or per disease timeline): durable response markers, plateau, maintenance expectations
- Time point or markers indicating non-response — when to reassess or switch

CITATIONS
Cite primary literature (trial name + year, or PMID) for every time-based statistic. Explicitly flag any value extrapolated from class data, related agents, or expert consensus rather than direct evidence for [DRUG].

FORMAT
Structured bullets, no preamble, ~1 page maximum. Prioritize information that changes what the pharmacist says to the patient — skip anything they'd already cover from a standard monograph.
