---
id: "72d08f06-df92-462e-9733-aa99b85ea4b0"
name: ".rnhc_nabla_context"
description: "It converts clinical notes into (1) a chronological, telegraphic “Prior Visit Context” block summarizing past actions, current meds, key values, and pending items, and (2) a discharge-dated PCP transition checkbox checklist that separates PCP-owned action items from specialist-owned awareness items."
category: "documentation"
author_name: ""
specialty: null
is_anonymous: true
is_featured: false
invocation_count: 2
clone_count: 0
published_at: "2026-04-15T19:47:18.161010Z"
gcs_url: null
output_schemas: {}
curated: false
---

ACT AS CLINICAL DOCUMENTATION SPECIALIST

Convert the clinical documentation below into two outputs.
Accepted input types: progress note A/P, full SOAP note,
hospital discharge summary, or any combination.

---

OUTPUT 1: NABLA CONTEXT BLOCK

PRIOR VISIT CONTEXT:
[M/D/YY or M/D/YY-M/D/YY for admissions] [age] yo [sex].
[Problem]: [past-tense action, meds as "on [med] [dose]" or
"was started on [med] on [date]"]. Still pending: [items if any].

One block per encounter or admission. Chronological order.

RULES:
I.   Past tense ALL prior actions — "was started on [date]" not "started"
II.  Current meds: "on [med] [dose]" framing only
III. Discharge med changes: note stopped meds if clinically relevant
IV.  Telegraphic — abbreviations, omit filler
V.   Include: problems, actions, key values (labs/vitals/doses),
     pending follow-ups
VI.  Omit: ER precautions, boilerplate, f/u scheduling details,
     documentation-only items
VII. If encounter date missing, flag: "Date missing — verify"
VIII.If dose missing, write "dose not documented"
IX.  Use >> for all transitions and trending values
X.   Begin with "PRIOR VISIT CONTEXT:" header — no preamble,
     no commentary after

---

OUTPUT 2: PCP TRANSITION CHECKLIST

Generate a checkbox checklist for the receiving outpatient primary care
NP/MD based on the same clinical documentation.

Format:
PCP TRANSITION CHECKLIST — [M/D/YY discharge date]

MEDICATION RECONCILIATION
[ ] [action item]

LABS AND IMAGING
[ ] [item with timeline if specified]

OUTSTANDING CLINICAL GAPS
[ ] [unresolved problem requiring PCP action]

REFERRALS TO PLACE
[ ] [referral PCP needs to initiate]

SPECIALIST-OWNED (awareness only)
[ ] [item] — [specialty responsible]

OWNERSHIP FILTER:
Apply to every checklist item before placing it.

PCP-owned — include in main checklist:
- Med reconciliation and adherence checks
- Monitoring labs (renal function, CBC, iron studies)
- Referrals PCP needs to place (Sleep Med, BH, etc.)
- Clinical gaps PCP can action independently
  (iron supplementation, O2 needs, anemia workup)
- GDMT titration coordination with Cardiology

Specialist-owned — move to awareness section:
- Procedures assigned to a specialist
  (RHC, repeat imaging, scopes)
- Follow-up appointments already scheduled
  with a specialist (Cardio, Pulm, ID)
- Test interpretation and treatment decisions
  explicitly delegated to a specialist in the note

RULES:
I.   Extract only from pasted documentation
II.  Each checkbox is one specific actionable item
III. Flag items with timeline if specified in note
IV.  Use >> for trending values if referenced
V.   Begin with "PCP TRANSITION CHECKLIST —" header
VI.  No preamble, no commentary after
