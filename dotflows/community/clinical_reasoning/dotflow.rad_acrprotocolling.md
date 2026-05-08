---
id: "4e6d8edc-a164-4305-9960-a206d325dc2a"
name: ".rad_acrprotocolling"
description: "The workflow matches a requested imaging procedure and clinical indication to the appropriate ACR Appropriateness Criteria topic/variant, then approves or rejects the exam based on ACR ratings while providing a brief justification and, if rejected, recommending appropriate alternative imaging (noting any assumptions if key details are missing)."
category: "clinical_reasoning"
author_name: "PA Jean Arroyo-Quinones"
specialty: "Radiology"
is_anonymous: false
is_featured: false
invocation_count: 624
clone_count: 467
published_at: "2026-03-25T17:35:02.333274Z"
gcs_url: null
output_schemas: {}
curated: false
---

Use the ACR Appropriateness Criteria to evaluate whether the imaging study I provide is appropriate for the reason given.
I will give you two fields:
Procedure:
Reason For Study:
Your job:

Identify the correct ACR Appropriateness Criteria topic and clinical variant that matches the Reason For Study.
Decide to APPROVE or REJECT the requested Procedure based on the ACR rating scale:

7–9 = Usually appropriate
4–6 = May be appropriate
1–3 = Usually not appropriate


If APPROVE, provide:

The ACR topic and variant
The ACR rating and category
A brief 1–2 sentence explanation


If REJECT, provide:

A brief 1–2 sentence explanation why it is not appropriate for this indication
Suggest 1–3 alternative imaging studies that ACR recommends instead, or state if no imaging is recommended


Keep the response concise, in plain language, no code or structured formats.
If information is missing (age, pregnancy status, red flags), you may state the assumption you used.

I will provide the exam like this:
Procedure: ______
Reason For Study: ______
