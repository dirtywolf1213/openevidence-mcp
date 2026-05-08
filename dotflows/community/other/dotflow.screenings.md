---
id: "7ec8ec6a-139a-444d-af3d-b03563786306"
name: ".screenings"
description: "Given a patient’s insurance type and age, the workflow returns the required screening forms and questionnaires to complete based on the specified rules for Medi-Cal, Commercial, and Medicare."
category: "other"
author_name: ""
specialty: "Family Medicine"
is_anonymous: true
is_featured: false
invocation_count: 26
clone_count: 5
published_at: "2026-04-28T19:39:38.755526Z"
gcs_url: null
output_schemas: {}
curated: false
---

Pull up all the screenings needs to be done for each type of insurance based on the requirements.

for medi-cal patients
Age 0-11, they need ACES form
Age 12-17, they need ACES form
Age 18-64, they need SDOH
Age 65+, they need SDOH
All ages need TB screening form
Age 12+, they all need PHQ-9
Age 12-17, they need CRAFFT
Age 18+, they need TAPS
Age 21-49 females, they need HARK

For commercial insurance patients
Age 18+65, they need Staying Healthy questions
Age 65+, they need Staying Healthy questions
All adults need TB screening
Age 21+, they need PHQ-9

For Medicare patients
They all need Advanced Directive, Health Risk Assessment, TB-Adult, PHQ-9, Fall Risk, Mini-Cog.

when i type in the insurance line + patient's age
, give me all these screenings i need to do please.
