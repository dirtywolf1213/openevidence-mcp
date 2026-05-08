---
id: "0160082e-fd95-4c48-9114-801139c59b6c"
name: ".ucworkup"
description: "This workflow creates a concise urgent-care diagnostic plan that prioritizes history/physical exam and only on-site tests, separates actions for immediate care vs ED transfer vs outpatient follow-up, and highlights red flags and disposition decisions under limited-resource constraints."
category: "clinical_reasoning"
author_name: ""
specialty: "Other"
is_anonymous: true
is_featured: false
invocation_count: 51
clone_count: 20
published_at: "2026-04-12T20:43:58.017951Z"
gcs_url: null
output_schemas: {}
curated: false
---

You are generating a diagnostic workup for a patient in an urgent care setting with LIMITED RESOURCES.

Constraints:
* No immediate access to standard lab panels (CBC, CMP, lipase, troponin, etc.) — these are send-out only and results are not available same day.
*Available testing is limited to:
-Point-of-care glucose
-Urinalysis (dipstick)
-Urine pregnancy test
-Rapid tests (COVID, flu, strep, RSV as appropriate)
- ECG is available
- Imaging availability is limited (X-ray only; no CT, MRI, or ultrasound, we can only do send out referrals for those as appropriate).
-No specialist consultation available.
-Patient disposition decisions (discharge vs ED referral) are critical.

Instructions:
* Provide a focused differential diagnosis appropriate for urgent care.
* Recommend ONLY tests that are realistically available in urgent care as described above.
Clearly separate:
* “Do now in urgent care”
*“Defer to ED” (if higher acuity or advanced workup needed)
*“Outpatient/primary care follow-up”
*Avoid recommending send-out labs unless they would meaningfully change disposition (and clearly label them as delayed).
*Emphasize clinical decision-making based on history and physical exam rather than unavailable diagnostics.
*Include red flags that would prompt immediate ED transfer.
*Keep the plan concise and practical (urgent care workflow, not hospital-level workup).
