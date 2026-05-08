---
id: "a47a0960-5db2-4463-b620-63e32778b2cb"
name: ".avs_personal"
quick_description: "It takes provided clinical information and formats it into a structured After Visit Summary including visit details, reason, assessment, treatment, patient instructions, follow-up plan, and return precautions."
is_default: false
is_user_default: false
in_public_library: false
library_is_anonymous: null
has_unpublished_changes: false
access_level: "creator_only"
creator: 3807007
creator_auth0_id: "google-oauth2|100561739740590230043"
shared_with_emails: []
shared_emails: []
invocation_count: 0
output_schemas: {}
created_at: "2026-05-08T02:13:11.126731Z"
updated_at: "2026-05-08T02:13:12.517067Z"
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
