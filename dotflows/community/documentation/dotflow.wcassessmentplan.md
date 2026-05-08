---
id: "e1fcede1-c773-4865-87bd-59e8a518cd97"
name: ".wcassessmentplan"
description: "Generates a concise, EHR-ready wound care clinic Impression and Plan in paragraph form from provided HPI/objective data, preserving bracketed section headers while populating evidence-based content (ICD-10 first, etiology/contributors/control measures, time spent, prognosis, and a brief fact-check note) and omitting nonapplicable sections without assumptions."
category: "documentation"
author_name: "NP Julian Dortman"
specialty: "Other"
is_anonymous: false
is_featured: false
invocation_count: 38
clone_count: 1
published_at: "2026-05-04T14:47:32.792089Z"
gcs_url: null
output_schemas: {}
curated: false
---

(When asked to create a wound care Impression and Plan it should model the following structure below. All text blocked in with [] should stay in the original text but the blocks should not. If there is a section that does not apply to a patient such as offloading for a a patient with a venous stasis ulcer, it may be omitted. Everything in (parenthesis) are directions and should not remain in the final document. ICD-10 code with most appropriate diagnosis should be listed first. The context under each section should be based off of the information provided and follow national wound care guidelines and healing principles. The documentation should take the place of the *** within the provided format. Avoid redundant phrasing, passive constructions, and filler language. Notes should read like an experienced clinician wrote them, not like a template. Tone: Formal and direct. No hedging, no excess qualifiers. Avoid phrases like "it is important to note" or "as mentioned above." Output format: Present the dotphrase as a plain text code block, ready to copy and paste directly into an EHR. Do not wrap it in explanation unless asked. At the End of the Note: Make sure to fact check against currently available resources and indicate any potential changes in the future based on available evidence.)

[Infection Management:]
- 
[Moisture management:] 
- 
[Offloading:]
- 
[Nutrition:] 
- 
[Tobacco/Nicotine Use:] 
- 
[Goal: is to have complete wound healing as the final outcome, monitor the wound for infection and treat appropriately and ensure adequate wound care healing principles.
Duration of care to coincide with etiology of wound(s) with the goal to achieve improved healing at 30 days and re-evaluate at 12 weeks if not healing.] 
[Prognosis to Heal:] Poor, moderate, Good
[Etiology in this case is:] (this should be the primary cause of the ulceration; if a patient is quadriplegic the etiology would be pressure, if they are diabetic, it would be a diabetic foot ulcer or neuroischemic ulcer, venous stasis, peripheral arterial etc.)
[Contributing Factors:] (this should add other nonprimary factors associated with patients wound being difficult to heal such as Paraplegia- Immobility, Sensory loss. Tobacco use. Diabetes. Peripheral arterial disease. Advanced Age. Obesity etc.)
[Control of contributing factors:] (This section should include all contributing factors that are associated with the patient having a difficult to heal wound, below is the format that should be followed with the problem listed and then interventions to address the problem followed. Below is only an example. This should be specific to each patient based on the information provided)
Pressure offloading — use of pressure-redistribution mattress/surface, specialized wheelchair cushion, and repositioning schedule/turning every 2 hours to address the underlying etiology of pressure 
Infection management — antibiotic therapy for chronic osteomyelitis of the right ischium; wound bed monitoring for signs of local or systemic infection; debridement of necrotic tissue as indicated 
Nutritional optimization - protein/calorie supplementation and monitoring of albumin/prealbumin to support wound healing 
Moisture management - Continue bowel/bladder program, barrier creams, and appropriate wound dressings to manage exudate and prevent maceration.
