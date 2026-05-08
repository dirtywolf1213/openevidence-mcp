---
id: "3afbaac3-37ff-483a-ab8e-61ccade32a84"
name: ".overview"
description: "This workflow transforms a clinical note into a single-paragraph, chart-ready, telegraphic problem-level summary (starting with “MGH GI 4/15/26:” when applicable) that follows a fixed order—problem context, 3–4 item DDx, key management-relevant abnormal data, action-only plan with exact medication names, and follow-up—while excluding non–decision-impacting details and any reconstructed narrative."
category: "documentation"
author_name: "NP Jonathan Morency"
specialty: ""
is_anonymous: false
is_featured: false
invocation_count: 6
clone_count: 1
published_at: "2026-04-19T17:07:13.613129Z"
gcs_url: null
output_schemas: {}
curated: false
---

1. Purpose Constraint (Primary Rule)
This output is for integration into a clinical note (HPI or problem-based assessment). Prioritize clinically relevant selection of information based on the intended target use. If multiple diagnoses or systems are present, segment implicitly by relevance to the primary clinical problem rather than merging into narrative form.

2. Mode Handling Rule
Follow the instructed mode: (A) HPI Integration Summary or (B) Problem-Based Summary. Do not mix structural logic between modes. If mode is not specified, default to Problem-Based Summary.

3. Output Format Is Absolute
Return a single continuous paragraph or sentence block. No bullets, headers, or line breaks.

4. Lead With Source Attribution When Applicable
If summarizing another clinician or encounter, begin with source/service and date (e.g., “w/u by GI 4/15/26”). Do not omit attribution.

5. Telegraphic Clinical Documentation Style Only
Use compressed, chart-ready medical shorthand (DDx, w/u, a/w, f/u, PRN, BID). No prose or narrative sentences. Prioritize information density over grammatical completeness.

6. Preserve Diagnostic Structure
Always include working diagnosis and relevant differential in compact form. Do not omit competing diagnoses when clinically relevant.

7. Convert All Plans Into Action Phrases
Express all management as direct actions (continue, start, add, stop, repeat, avoid, schedule). No narrative framing of recommendations.

8. Include Only Clinically Actionable Reasoning
Retain reasoning only when it changes or explains management decisions. Omit background teaching or non-actionable associations.

9. Standardize Medication and Intervention Language
List medications and interventions using name ± key instruction only. Include dose/frequency only if clinically relevant to decision-making.

10. Eliminate Narrative and Low-Yield Language
Remove all explanatory phrasing, filler, and documentation language (e.g., “was evaluated,” “counseled,” “provider noted”) unless it alters clinical meaning.

11. Maintain High Signal Density Without Adding New Information
Do not introduce new diagnoses, tests, or plans not present in the source. Every element must be traceable to provided information.

12. Telegraphic Clinical Documentation Style Enforcement
Strictly enforce fragment-based, telegraphic clinical writing. Do not generate prose, fully grammatical narrative sentences, or explanatory transitions. All output must read like compressed clinical charting optimized for rapid review rather than readability.

13. Close With Disposition / Follow-Up
End with pending workup, follow-up, or next step (e.g., “f/u pending colonoscopy,” “RTC 6 weeks,” “await bx results”).

14. Resolve Minor Ambiguity Silently When Safe
Correct obvious dictation or transcription errors if meaning is clear. Do not call attention to corrections.

15. Real-World Charting Priority Rule
Prioritize how experienced clinicians document in real clinical systems (EMR-ready, scan-efficient, abbreviation-heavy) over grammatical correctness or narrative flow.
