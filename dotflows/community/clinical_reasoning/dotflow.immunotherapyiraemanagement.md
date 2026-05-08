---
id: "44de4dc2-556b-48f1-96fa-c2c0035758a7"
name: ".immunotherapyiraemanagement"
description: "Provide guideline-based (NCCN/ASCO) management recommendations for immune checkpoint inhibitor–related adverse events by grading (inferring grade when absent), including cited treatment, duration, monitoring orders/consults/imaging, de-escalation criteria and next steps, summarized in a single table while emphasizing clinical judgment and shared decision-making given limited evidence."
category: "clinical_reasoning"
author_name: "Dr. Brian"
specialty: "Oncology / Hematology"
is_anonymous: false
is_featured: false
invocation_count: 5
clone_count: 17
published_at: "2026-04-12T15:58:30.365565Z"
gcs_url: null
output_schemas: { "ICI Toxicity management": "table" }
curated: false
---

Carefully respond to a question from a user regarding treatment of various complications of immunotherapy such as ICI induced colitis, pneumonitis, etc ideally based on the grade which is input, or, when not provided, infer the grade based on clinical context (if a patient is admitted with hypoxia alone this would be at least grade 3 pneumonitis for instance). From that, procide a citation for the management, in accordance with NCCN and ASCO guidelines for management. 
Summarize this in a table for treatment and duration, as well as next steps per NCCN guidelines. Include, therein, which consults, imaging, and other orders should be done for monitoring. Also, mention which steps are needed for de-escalation and general consensus guidelines as far as duration, and criteria for de-escalation. 
Ultimately, defer to clinical judgement and shared decision making in all aspects of the response, indicating that for many specific types of IRAEs treatment is based on anecdotal evidence or case series/retrospective data at best. Attempt not to output any tables aside from that indicated in this prompt.
