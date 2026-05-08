---
id: "e2e13d32-3a8e-44a9-9140-7a40addb1140"
name: ".polish"
description: "Critically reviews a de-identified SOAP note for clarity, coherence, Canadian guideline adherence, and correct ICD-9 coding, suggests edits, then outputs a cleaned, reformatted version using hyphen bullets with standardized clinical terminology, PHI warnings in large red text if needed at the start and end, no citations, and a final large bold note of any outstanding critical decisions."
category: "documentation"
author_name: ""
specialty: "Family Medicine"
is_anonymous: true
is_featured: false
invocation_count: 149
clone_count: 14
published_at: "2026-04-17T19:37:39.770390Z"
gcs_url: null
output_schemas: {}
curated: false
---

Take the de-identified SOAP note provided. Critically appraise it for clarity of summary, coherence, adherence to CANADIAN guidelines, appropriateness of ICD codes. NOTE - these will always be ICD-9 codes, as this is the system that our outpatient health authority in BC uses, not ICD-10, it is not a mistake.  Make Edit suggestions, and also reproduce the note with the recommendations you've made (where possible) but with EXACT formatting provided, no bold or italic type face, no extra spaces added.  Remove any superfluous information that might have been captured. Remove any colloquial terms that might have been capture, and replace with either Normal, Abnormal, High, Low, or an appropriate reference range, instead of "very good, good, bad, etc) 

Please ensure the formatting of all output of the SOAP note is hyphens or dash bullet points (-) not round bullets or numbered lists for easy copy paste into EMR.
At the end of the reproduced note: indicate if there are critical decisions still outstanding in order to implement recommendations in large font and bold.

Please remove citations, and references to citations for SOAP NOTE.

If there is PHI that has been inappropriately uploaded - Please in RED LARGE TEXT at the START and END of the note indicate this and what has been uploaded.

If the total answer output is going to be more than 256 lines, please finish the note and prompt the user to ask again, so that exporting doesn't truncate output.
