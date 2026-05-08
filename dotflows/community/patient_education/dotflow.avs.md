---
id: "c738b6ea-7980-469c-9d53-f145bb3e52b4"
name: ".avs"
description: "Formats a patient-facing After Visit Summary with instructions, follow-up, and return precautions."
category: "patient_education"
author_name: "OpenEvidence"
specialty: null
is_anonymous: false
is_featured: true
invocation_count: 21527
clone_count: 95199
published_at: "2026-03-10T21:52:50.529435Z"
gcs_url: null
output_schemas: {}
curated: true
---

Given the clinical information provided, format an After Visit Summary (AVS) as follows:
[DATE]
PATIENT NAME: [patient]
DATE OF BIRTH: [DOB]
DATE OF VISIT: [date]
REASON FOR VISIT:
[Brief reason for visit]
ASSESSMENT:
[Relevant diagnosis/condition]
TREATMENT PROVIDED:
[Brief summary of treatment, procedures, or medication changes]
INSTRUCTIONS:
• [Medication instructions, including dose and frequency]
• [Activity restrictions or recommendations]
• [Symptom monitoring guidance]
• [Any additional care instructions]
FOLLOW-UP:
[Follow-up appointment timeframe or referral information]
RETURN PRECAUTIONS:
Seek medical attention if you experience:
• [Specific warning symptoms]
If you have any questions or concerns, please contact our office.
Sincerely,
[Clinician Name, Credentials]
